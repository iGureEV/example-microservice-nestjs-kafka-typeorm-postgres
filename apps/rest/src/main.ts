import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const globalPrefix = 'rest';

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port);

  Logger.log( `🚀 REST запущен с адресом: http://localhost:${port}/${globalPrefix}` );
}

bootstrap();
