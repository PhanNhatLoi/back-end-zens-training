import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthDto } from '../user/dto/auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { LoginResponseType } from './types';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModal: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  // register
  async register(createUserDto: CreateUserDto): Promise<User> {
    const checkUsernameUnique = await this.userService.findByParams({
      $or: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (checkUsernameUnique) {
      throw new ConflictException('Username or email already exists!');
    }
    try {
      const passwordHash = await argon2.hash(createUserDto.password);

      const newUser = await this.userService.create({
        ...createUserDto,
        id: new Date(Date.now()).getTime().toString(),
        password: passwordHash,
        role: 'user',
      });

      const tokens = await this.getTokens(newUser.id, newUser.username);
      await this.updateRefreshToken(newUser.id, tokens.refreshToken);

      return newUser.toObject({
        transform: (_, ret) => {
          delete ret.password;
          delete ret._id;
          delete ret.__v;
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // get token
  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '1d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  // login
  async login(data: AuthDto): Promise<LoginResponseType> {
    const user = await this.userService.findByParams({
      username: data.username,
    });
    if (!user) {
      throw new BadRequestException('Username not found!');
    }
    try {
      const isMatch = await argon2.verify(user.password, data.password);
      if (!isMatch) throw new UnauthorizedException('Password wrong!');

      const tokens = await this.getTokens(user.id, user.username);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null });
  }

  async getProfile(id: string): Promise<User> {
    const findUser = await this.UserModal.findOne({
      id: id,
    }).select(['-password', '-_id', '-__v', '-refreshToken']);
    if (!findUser) {
      throw new InternalServerErrorException('Data error!');
    }

    return findUser;
  }

  // refresh token
  async refreshTokens(
    id: string,
    refreshToken: string,
  ): Promise<LoginResponseType> {
    const user = await this.userService.findByParams({ id });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
