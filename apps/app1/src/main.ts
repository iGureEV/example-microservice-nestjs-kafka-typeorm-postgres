/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

/**
 * Гибридное приложение (MS + Kafka)
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // подключаем микросервис
  const port_ms = Number(process.env.PORT_MS) || 3011;
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port_ms,
    }
  });
  // TODO: добавить микросервис кафки
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9095'],
        clientId: 'app1.producer',
      },
      consumer: {
        groupId: 'app1.consumer',
        allowAutoTopicCreation: true,
      }
    }
  });
  await app.startAllMicroservices();
  Logger.log(
    `🚀 Hybrid app is running with TCP microservice on port: ${port_ms}`,
  );
}

bootstrap();
