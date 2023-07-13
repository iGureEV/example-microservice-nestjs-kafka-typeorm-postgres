import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Repository } from 'typeorm';

import { EvaluationEntity, EvaluationRequestDto } from '@test2/shared';

@Injectable()
export class AppService {
    constructor(
    private readonly evaluationRepository: Repository<EvaluationEntity>,
        @Inject('HERO_SERVICE') private readonly client: ClientKafka,
    ) {}

    getData(): { message: string } {
        return { message: 'Hello API' };
    }

    async getEvaluations(): Promise<EvaluationEntity[]> {
        return this.evaluationRepository.find({
            order: {
                id: "DESC"
            },
            take: 10,
        });
    }
}
