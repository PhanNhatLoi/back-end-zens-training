import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
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
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUser: CreateUserDto): Promise<User> { // any hardcode to do change after
    return this.authService.register(createUser);
  }
}
