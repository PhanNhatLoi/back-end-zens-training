import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUser: CreateUserDto): Promise<User> {
    // any hardcode to do change after
    return this.authService.register(createUser);
  }
}
