import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {

  private heroService: ClientKafka;

  // TODO: тут я просто прокинул тебе сервис для примера. он живой и умеет отправлять запросы
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor (@Inject('HERO_SERVICE') heroService: ClientKafka) {
    this.heroService = heroService;
  }

  getData(): { message: string } {
    const someObject = {
      message: 'test',
    };
    // TODO: а это тебе пример отправки в кафку
    this.heroService.emit('topic_to_send', someObject);

    return { message: 'Hello API' };
  }
}
