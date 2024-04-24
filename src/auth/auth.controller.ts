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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('api/v1')
export class AuthControllerV1 {
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
      type: 'LoginUserDto',
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
  @Post('/login')
  async login(@Body() user: LoginUserDto): Promise<User> {
    // any hardcode to do change after
    return this.authService.login(user);
  }
}

@ApiTags('auth')
@Controller('api/v2')
export class AuthControllerV2 {
  constructor(private readonly authService: AuthService) {}

  // login
  @ApiBody({
    type: LoginUserDto,
  })
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
  @ApiCreatedResponse({
    description: 'Created',
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzEzOTI2MTc4NTMyIiwidXNlcm5hbWUiOiJ0ZXN0MTEyMyIsImlhdCI6MTcxMzkyOTMyNSwiZXhwIjoxNzE0MDE1NzI1fQ.55UiWr_tZaAFpkif9JI13KC1qHW7EMCiFyHfMO58-8I',
      },
    },
  })
  @Post('/login')
  async login(@Body() user: LoginUserDto): Promise<{ access_token: string }> {
    // any hardcode to do change after
    return this.authService.loginReturnToken(user);
  }
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Request() req): Promise<User> {
    return this.authService.getProfile(req.user.sub);
  }
}
