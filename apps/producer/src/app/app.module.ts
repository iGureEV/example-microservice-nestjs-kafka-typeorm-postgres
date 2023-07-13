import { Module } from '@nestjs/common';

import { genClientKafka, genConnectPG } from '@test2/shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    genConnectPG(),
    genClientKafka('hybrid.producer', 'hybrid.consumer'),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
