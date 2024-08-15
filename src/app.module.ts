import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ShortenModule } from './shorten/shorten.module';
import * as Joi from 'joi';
import DatabaseModule from './database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis.options';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGODB_URL: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        CACHE_TTL: Joi.number().required(),
      }),
    }),
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    CacheModule.registerAsync(RedisOptions),
    ShortenModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
