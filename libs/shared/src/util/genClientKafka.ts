import { ClientsModule, Transport } from '@nestjs/microservices';

export function genClientKafka (clientId: string, groupId: string) {
    return ClientsModule.register([
        {
            name: 'HERO_SERVICE',
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId,
                    brokers: ['localhost:9095'],
                },
                consumer: {
                    groupId
                }
            }
        },
    ]);
}
