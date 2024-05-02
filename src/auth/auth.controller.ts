import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Req,
  Res,
  Put,
  BadRequestException,
  GatewayTimeoutException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/schemas/user.schema';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiGatewayTimeoutResponse,
  ApiHeader,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthDto } from '../user/dto/auth-user.dto';
import { LoginResponseType } from './types';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';
import { ChangePasswordUserDto } from '../user/dto/change-password-user.dto';

@ApiTags('auth')
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // register
  @Post('/register')
  @ApiBody({
    schema: {
      type: 'CreateUserDto',
      example: {
        email: 'user@example.com',
        username: 'exampleuser',
        password: '12345@Abc',
        fullName: 'John Doe',
        address: '123 Street, City',
        gender: 'male',
        dob: '1990-01-01',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Created',
    schema: {
      example: {
        id: '123456',
        email: 'user@example.com',
        username: 'exampleuser',
        fullName: 'John Doe',
        address: '123 Street, City',
        gender: 'male',
        dob: '1990-01-01',
        role: 'user',
      },
    },
  })
  @ApiConflictResponse({ description: 'Username or email already exists!' })
  @ApiBadRequestResponse({ description: 'password is not strong enough' })
  async register(@Body() createUser: CreateUserDto): Promise<User> {
    // any hardcode to do change after
    return this.authService.register(createUser);
  }

  // login
  @ApiBody({
    schema: {
      example: {
        username: 'exampleuser',
        password: '12345@Abc',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'username should not be empty' })
  @ApiBadRequestResponse({ description: 'password should not be empty' })
  @ApiUnauthorizedResponse({
    description: 'Username not found!',
  })
  @ApiUnauthorizedResponse({
    description: 'Password wrong!',
  })
  @ApiCreatedResponse({
    description: 'Created',
    schema: {
      example: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzE0MDI2ODA2MzI3IiwidXNlcm5hbWUiOiJleGFtcGxldXNlciIsImlhdCI6MTcxNDAyNjk2NywiZXhwIjoxNzE0MDMwNTY3fQ.a66ZU22tzQEBrcpicyJq7dPJ5rk6T4YesOYznKghtKg',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzE0MDI2ODA2MzI3IiwidXNlcm5hbWUiOiJleGFtcGxldXNlciIsImlhdCI6MTcxNDAyNjk2NywiZXhwIjoxNzE0MTEzMzY3fQ.bxDVtvvKQhcgtQ58wyqroO88xjWe8uy9b_E2ShvNH8U',
      },
    },
  })
  @Post('/login')
  async login(@Body() user: AuthDto): Promise<LoginResponseType> {
    return this.authService.login(user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Request() req) {
    this.authService.logout(req.user['sub']);
  }

  // get profile
  @ApiHeader({
    name: 'accessToken',
    description: 'accessToken',
    schema: {
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzE0MDI2ODA2MzI3IiwidXNlcm5hbWUiOiJleGFtcGxldXNlciIsImlhdCI6MTcxNDAyNjk2NywiZXhwIjoxNzE0MDMwNTY3fQ.a66ZU22tzQEBrcpicyJq7dPJ5rk6T4YesOYznKghtKg',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  async getProfile(@Request() req): Promise<User> {
    return this.authService.getProfile(req.user.sub);
  }

  //refresh Token
  @ApiHeader({
    name: 'refreshToken',
    description: 'refreshToken',
    schema: {
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzE0MDI2ODA2MzI3IiwidXNlcm5hbWUiOiJleGFtcGxldXNlciIsImlhdCI6MTcxNDAyNjk2NywiZXhwIjoxNzE0MTEzMzY3fQ.bxDVtvvKQhcgtQ58wyqroO88xjWe8uy9b_E2ShvNH8U',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiCreatedResponse({
    description: 'Created',
    schema: {
      example: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzE0MDI2ODA2MzI3IiwidXNlcm5hbWUiOiJleGFtcGxldXNlciIsImlhdCI6MTcxNDAyNjk2NywiZXhwIjoxNzE0MDMwNTY3fQ.a66ZU22tzQEBrcpicyJq7dPJ5rk6T4YesOYznKghtKg',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzE0MDI2ODA2MzI3IiwidXNlcm5hbWUiOiJleGFtcGxldXNlciIsImlhdCI6MTcxNDAyNjk2NywiZXhwIjoxNzE0MTEzMzY3fQ.bxDVtvvKQhcgtQ58wyqroO88xjWe8uy9b_E2ShvNH8U',
      },
    },
  })
  @ApiBearerAuth('refreshToken')
  @UseGuards(RefreshTokenGuard)
  @Get('/refresh-token')
  async refreshToken(@Request() req) {
    return this.authService.refreshTokens(
      req.user['sub'],
      req.user['refreshToken'],
    );
  }

  // forgot password
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'email not found!' })
  @ApiGatewayTimeoutResponse({
    description: 'You just sent an email, please try again after 3 minutes!',
  })
  @ApiCreatedResponse({
    description: 'Send email success',
  })
  @Post('/forgot-password')
  async forgotPassword(@Body() { email }: { email: string }): Promise<string> {
    await this.authService.forgotPassword(email);
    return 'Send email success';
  }

  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
        password: '123456@Abc',
        code: '123456',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Change password code wrong!' })
  @ApiCreatedResponse({
    description: 'Change password success',
  })
  @Put('/change-password')
  async changePassword(@Body() body: ChangePasswordUserDto): Promise<String> {
    return this.authService.changePassword(body);
  }
}
