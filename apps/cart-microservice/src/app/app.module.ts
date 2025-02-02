import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AppSubscribers } from "./app.subscribers";
import { MicroservicesSharedEventBusModule } from "@shop-project/microservices/shared/event-bus";

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MicroservicesSharedEventBusModule,
  ],
  providers: [AppService, AppSubscribers],
})
export class AppModule {}
