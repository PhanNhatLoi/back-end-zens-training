import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthControllerV1 } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthControllerV1],
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
