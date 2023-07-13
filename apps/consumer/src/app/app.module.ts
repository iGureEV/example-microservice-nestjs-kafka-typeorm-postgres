import { Module } from '@nestjs/common';

import { genClientKafka } from '@test2/shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    genClientKafka('service.producer', 'service.consumer'),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
