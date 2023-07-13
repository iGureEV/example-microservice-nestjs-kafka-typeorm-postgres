import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern, Transport } from '@nestjs/microservices';

import { EvaluationRequestDto, EvaluationDto, EOperation } from '@test2/shared';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

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

  @EventPattern('medium.rocks', Transport.KAFKA)
  readMessageTest(data: any) {
    const response = 'Получение нового сообщения из темы: medium.rocks: ' + JSON.stringify(data);
    console.log(response);
  }

  @EventPattern('test2.evalRequest', Transport.KAFKA)
  readMath(param: EvaluationRequestDto): Observable<EvaluationDto> {
    let result: number;
    switch (param.op) {
      case EOperation.SUM:
        result = param.a + param.b;
        break;
      case EOperation.MULT:
        result = param.a * param.b;
        break;
    }
    return this.client.emit('test2.evalResponse', result);
  }
}
