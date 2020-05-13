import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose'

async function bootstrap() {
  mongoose.set('useCreateIndex', true);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3500);
}
bootstrap();
