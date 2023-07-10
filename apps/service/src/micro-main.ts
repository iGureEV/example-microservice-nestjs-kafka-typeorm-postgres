import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
            brokers: ['localhost:9092'],
        },
      },
    }
  );
  await app.listen().then(() => {
    console.log('Main-App Microservice is listening');
    Logger.log(`Main-App Microservice is running on: http://localhost:15672`);
  });
}

bootstrap();