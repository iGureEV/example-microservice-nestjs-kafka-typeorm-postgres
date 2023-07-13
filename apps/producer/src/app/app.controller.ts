import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern, Transport } from '@nestjs/microservices';

import { EvaluationDto } from '@test2/shared';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('HERO_SERVICE') private readonly client: ClientKafka,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('kafka-test')
  testKafka() {
    return this.client.emit('medium.rocks', { goo:'bar', data: new Date().toJSON() })
  }

  @EventPattern('test2.evalResponse', Transport.KAFKA)
  readMessageTest(data: EvaluationDto) {
    const response = 'Получение нового сообщения из темы: medium.rocks: ' + JSON.stringify(data);
    console.log(response);
  }
}
