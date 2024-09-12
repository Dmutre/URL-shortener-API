import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Handler } from 'express';

const server = express();

export const nestFunction: Handler = async (req, res) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const configService = await app.get(ConfigService);
  const PORT = configService.get<string>('port') || 8080;

  const options = new DocumentBuilder()
    .setTitle('URL Shortener API docs')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.init();
  console.log(`Server initialized on port: ${PORT}`);
  server(req, res);
};
