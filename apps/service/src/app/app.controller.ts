import { Controller } from '@nestjs/common';
import { EventPattern, Transport } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('change_this_topic', Transport.KAFKA)
  async accumulate(data: number[]): Promise<number> {
    // TODO: в сервисе выполни вычисления и отправь ответ на клиента кафки
    return (data || []).reduce((a, b) => a + b);
  }
}
