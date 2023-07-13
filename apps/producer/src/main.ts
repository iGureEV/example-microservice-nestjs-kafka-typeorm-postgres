import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const port_ms = Number(process.env.PORT_MS) || 3011;
  const globalPrefix = 'rest';

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port_ms,
    }
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9095'],
        clientId: 'hybrid.producer',
      },
      consumer: {
        groupId: 'hybrid.consumer',
        allowAutoTopicCreation: true,
      }
    }
  });

  await app.startAllMicroservices();

  Logger.log( `🚀 Запущен Kafka producer для отправки комманд полученных из микросервисов по TCP на порту: ${port_ms}` );
}

bootstrap();
