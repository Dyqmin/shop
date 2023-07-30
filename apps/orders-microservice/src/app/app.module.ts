import { Module } from '@nestjs/common';
import { MicroservicesSharedDatabaseModule } from '@shop-project/microservices/shared/database';
import { AppService } from './app.service';
import { MicroservicesSharedEventBusModule } from "@shop-project/microservices/shared/event-bus";
import { AppSubscribers } from "./app.subscribers";

@Module({
  imports: [
    MicroservicesSharedDatabaseModule.forRoot({
      port: '5433',
      user: 'postgres',
      password: 'postgres',
      host: 'localhost',
    }),
    MicroservicesSharedEventBusModule,
  ],
  providers: [AppService, AppSubscribers],
})
export class AppModule {}
