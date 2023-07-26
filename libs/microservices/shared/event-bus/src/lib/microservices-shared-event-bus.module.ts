import { Module } from '@nestjs/common';
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'event-exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      channels: {
        'channel-1': {
          prefetchCount: 15,
          default: true,
        },
        'channel-2': {
          prefetchCount: 2,
        },
      },
    }),
  ],
  exports: [
    RabbitMQModule,
  ]
})
export class MicroservicesSharedEventBusModule {}
