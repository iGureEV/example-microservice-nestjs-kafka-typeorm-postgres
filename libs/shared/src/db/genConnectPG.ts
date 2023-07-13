import { TypeOrmModule } from '@nestjs/typeorm';

import { EvaluationEntity } from '../entities';

export function genConnectPG() {
    return TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'host.docker.internal',
        port: 5435,
        username: 'pguser',
        password: 'pgpass',
        database: 'tasks2db',
        entities: [EvaluationEntity],
        synchronize: true,
    });
}
