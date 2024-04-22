import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('api/v1')
export class AuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUser: CreateUserDto): Promise<User> {
    // any hardcode to do change after
    return this.authService.register(createUser);
  }

  @Post('/login')
  async lgoin(@Body() user: LoginUserDto): Promise<User> {
    // any hardcode to do change after
    return this.authService.login(user);
  }
}

@Controller('api/v2')
export class AuthControllerV2 {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUser: CreateUserDto): Promise<User> {
    // any hardcode to do change after
    return this.authService.register(createUser);
  }

  @Post('/login')
  async login(@Body() user: LoginUserDto): Promise<{ access_token: string }> {
    // any hardcode to do change after
    return this.authService.loginReturnToken(user);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Request() req): Promise<User> {
    return this.authService.getProfile(req.user.sub);
  }
}
