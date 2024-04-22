import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI + process.env.DB_NAME),
  ],
})
export class MongodbModule {}
