import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModal: Model<User>,
    private jwtService: JwtService,
  ) {}

  // register
  async register(createUserDto: CreateUserDto): Promise<User> {
    const checkUsernameUnique = await this.UserModal.findOne({
      $or: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    }).exec();
    if (checkUsernameUnique) {
      throw new ConflictException('Username or email already exists!');
    }
    try {
      const passwordHash = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
      const newUser = new this.UserModal({
        ...createUserDto,
        id: new Date(Date.now()).getTime().toString(),
        password: passwordHash,
      });

      const saveRes = await newUser.save();
      return saveRes.toObject({
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

  // login
  async login(user: LoginUserDto): Promise<User> {
    const findUser = await this.UserModal.findOne({
      username: user.username,
    }).exec();
    if (!findUser) {
      throw new UnauthorizedException('Username not found!');
    }
    try {
      const isMatch = await bcrypt.compare(user.password, findUser.password);
      if (!isMatch) throw new UnauthorizedException('Password wrong!');

      return findUser.toObject({
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

  // login return token
  async loginReturnToken(
    user: LoginUserDto,
  ): Promise<{ access_token: string }> {
    const findUser = await this.UserModal.findOne({
      username: user.username,
    }).exec();
    if (!findUser) {
      throw new UnauthorizedException('Username not found!');
    }
    try {
      const isMatch = await bcrypt.compare(user.password, findUser.password);
      if (!isMatch) throw new UnauthorizedException('Password wrong!');

      const payload = { sub: findUser.id, username: findUser.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  // get profile
  async getProfile(id: string): Promise<User> {
    const findUser = await this.UserModal.findOne({
      id: id,
    }).select(['-password', '-_id', '-__v']);
    if (!findUser) {
      throw new InternalServerErrorException('Data error!');
    }

    return findUser;
  }
}
