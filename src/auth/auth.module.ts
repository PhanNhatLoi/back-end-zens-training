import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { MongodbModule } from '../mongodb/mongodb.module';
import { SendmailService } from '../sendmail/sendmail.service';
import { AuthResolver } from './auth.resolver';
configDotenv();

@Module({
  imports: [MongodbModule, JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ConfigService,
    UserService,
    SendmailService,
    AuthResolver,
  ],
})
export class AuthModule {}
