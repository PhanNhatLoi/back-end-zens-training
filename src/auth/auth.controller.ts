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
<<<<<<< Updated upstream
import { CreateUserDto } from './dto/create-user.dto';
// _______Controllers_______//
// - Register:
// router: /register
// Method :POST
// headers: null
// body: {
//      email: string; (require)
//      fullName: string; (require)
//      password: string; (require)
//      address: string; (require)
//      gender: string;
//      dob: string; (require)
// }
// Response : {
//          user:{
//                id:string; (unique)
//                email: string;
//                fullName: string;
//                password: string;
//                address: string;
//                gender: string;
//                dob: string;
//                role: "user"| "admin";
//                }
// }

// _______Controllers_______//
@Controller('auth')
export class AuthController {
=======
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('api/v1')
export class AuthControllerV1 {
>>>>>>> Stashed changes
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUser: CreateUserDto): Promise<User> { // any hardcode to do change after
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
