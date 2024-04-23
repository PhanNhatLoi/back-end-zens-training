import { Args, Query, Resolver } from '@nestjs/graphql';
import { AccessToken, User } from './schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Resolver('auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  //register
  @Query(() => User)
  async register(
    @Args('username', { type: () => String }) username: string,
    @Args('email', { type: () => String }) email: string,
    @Args('fullName', { type: () => String }) fullName: string,
    @Args('password', { type: () => String }) password: string,
    @Args('address', { type: () => String, nullable: true }) address?: string,
    @Args('gender', { type: () => String, nullable: true }) gender?: string,
    @Args('dob', { type: () => String, nullable: true }) dob?: string,
  ): Promise<User> {
    const user = {
      username,
      email,
      fullName,
      password,
      address,
      gender,
      dob,
      id: new Date(Date.now()).getTime().toString(),
      role: 'user',
    };
    return this.authService.register(user);
  }

  //login
  @Query(() => User)
  async login(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String })
    password: string,
  ): Promise<User> {
    return this.authService.login({ username: username, password: password });
  }

  //login return token
  @Query(() => AccessToken)
  async loginReturnToken(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String })
    password: string,
  ): Promise<AccessToken> {
    return this.authService.loginReturnToken({
      username: username,
      password: password,
    });
  }

  //get profile
  @Query(() => User)
  async getProfile(
    @Args('access_token', { type: () => String }) access_token: string,
  ): Promise<User> {
    const payload = await this.jwtService.verifyAsync(access_token, {
      secret: process.env.jwtConstants_secret,
    });
    return this.authService.getProfile(payload.sub);
  }
}
