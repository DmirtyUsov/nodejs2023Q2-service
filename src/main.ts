import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { OpenApiData } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('doc', app, OpenApiData as OpenAPIObject);

  const port = app.get(ConfigService).get('PORT') || 4000;

  await app.listen(port);
}
bootstrap();
