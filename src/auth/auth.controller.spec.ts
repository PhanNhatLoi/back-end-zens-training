import { Test, TestingModule } from '@nestjs/testing';
import { AuthControllerV1, AuthControllerV2 } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('Controller testing', () => {
  let controller1: AuthControllerV1;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthControllerV1, AuthControllerV2],
      providers: [AuthService, AuthResolver],
      imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forRoot(process.env.MONGODB_URI + process.env.DB_NAME),
        JwtModule.register({
          global: true,
          secret: process.env.jwtConstants_secret,
          signOptions: { expiresIn: '1d' },
        }),
      ],
    }).compile();

    controller1 = app.get<AuthControllerV1>(AuthControllerV1);
  });

  describe('REGISTER', () => {
    it('TC_REGISTER_02', async () => {
      const userToRegister = {
        username: 'test9',
        email: 'example@gmail.com',
        fullName: 'phan nhat loi',
        password: '12345@Abc',
        address: 'gvap hcm',
        gender: 'nam',
        dob: '22/02/1999',
      };

      expect(() => controller1.register(userToRegister)).rejects.toThrow(
        new ConflictException('Username or email already exists!'),
      );
    });
    it('TC_REGISTER_03', async () => {
      const userToRegister = {
        username: 'exampleuser',
        email: 'nhatloi2202@gmail.com',
        fullName: 'phan nhat loi',
        password: '12345@Abc',
        address: 'gvap hcm',
        gender: 'nam',
        dob: '22/02/1999',
      };

      expect(() => controller1.register(userToRegister)).rejects.toThrow(
        new ConflictException('Username or email already exists!'),
      );
    });

    it('TC_REGISTER_05', async () => {
      const userToRegister = {
        username: 'exampleuser',
        email: 'exampleuser123@gmail.com',
        fullName: 'phan nhat loi',
        password: '123',
        address: 'gvap hcm',
        gender: 'nam',
        dob: '22/02/1999',
      };

      expect(() => controller1.register(userToRegister)).rejects.toThrow(
        new BadRequestException(),
      );
    });
  });
});
