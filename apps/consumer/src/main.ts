import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

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

  Logger.log( `🚀 Запущен Kafka comsumer для обрабатывающий команд!` );
}

bootstrap();
