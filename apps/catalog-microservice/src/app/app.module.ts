import { Inject, Module } from '@nestjs/common';
import { MicroservicesSharedDatabaseModule } from '@shop-project/microservices/shared/database';
import { MicroservicesSharedEventBusModule } from '@shop-project/microservices/shared/event-bus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppSubscribers } from "./app.subscribers";

@Module({
  imports: [
    MicroservicesSharedDatabaseModule.forRoot({
      port: '5432',
      user: 'postgres',
      password: 'postgres',
      host: 'localhost',
    }),
    MicroservicesSharedEventBusModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppSubscribers
  ],
})
export class AppModule {}
