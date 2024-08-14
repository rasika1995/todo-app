import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guard/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.useGlobalPipes(new ValidationPipe());

  // Use AuthGuard globally with DI (Dependency Injection)
  const authGuard = app.get(AuthGuard); // Get instance through DI
  app.useGlobalGuards(authGuard);

  await app.listen(3000);
}
bootstrap();
