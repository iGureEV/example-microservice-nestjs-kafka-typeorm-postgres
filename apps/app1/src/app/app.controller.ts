import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { EventPattern, MessagePattern, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODO: тут всё поменять надо, это просто пример
  @EventPattern('change_this_topic', Transport.KAFKA)
  getData() {
    return this.appService.getData();
  }

  // TODO: тут всё поменять надо, это просто пример
  // это приёмка запросов от rest
  @MessagePattern('change_this_cmd', Transport.TCP)
  getData2() {
    return this.appService.getData();
  }
}
