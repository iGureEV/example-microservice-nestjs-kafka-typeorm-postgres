import { Module } from '@nestjs/common';

import { genClientKafka, genClientTCP } from '@test2/shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    genClientTCP(),
    genClientKafka('rest.producer', 'rest.consumer'),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
