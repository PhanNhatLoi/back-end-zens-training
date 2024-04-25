import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configDotenv } from 'dotenv';
import { User, UserSchema } from '../user/schemas/user.schema';
configDotenv();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI + process.env.DB_NAME),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class MongodbModule {}
