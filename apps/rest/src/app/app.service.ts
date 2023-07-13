import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Repository } from 'typeorm';

import { EvaluationEntity, EvaluationRequestDto } from '@test2/shared';

@Injectable()
export class AppService {
  constructor(
    @Inject('HERO_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getEvaluations(): Promise<EvaluationEntity[]> {
    return [];
  }

  postEvaluations(data: EvaluationRequestDto) {
    this.clientKafka.emit('test2.postEvaluation', data);
  }
}
