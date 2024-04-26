import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { UserModule } from './user/user.module';
import { SendmailModule } from './sendmail/sendmail.module';

@Module({
  imports: [AuthModule, MongodbModule, UserModule, SendmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
