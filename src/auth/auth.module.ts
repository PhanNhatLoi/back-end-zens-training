import { Module } from '@nestjs/common';
import { AuthControllerV1, AuthControllerV2 } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';
configDotenv();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.jwtConstants_secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthControllerV1, AuthControllerV2],
  providers: [AuthService],
})
export class AuthModule {}
