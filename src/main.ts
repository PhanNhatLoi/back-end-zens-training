import { configDotenv } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
configDotenv();

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app
    .listen(PORT)
    .then(() => {
      console.log('Server running ', PORT);
    })
    .catch((err) => {
      console.log(err);
    });
}
bootstrap();
