/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

/** Kafka микросервис (консюмер и продьюсер) */
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9095'],
        clientId: 'service.producer',
      },
      consumer: {
        groupId: 'service.consumer',
        allowAutoTopicCreation: true,
      }
    }
  });
  await app.listen();
  Logger.log(
    `🚀 Kafka microservice is running!`,
  );
}

bootstrap();
