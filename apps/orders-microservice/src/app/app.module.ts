import { Module } from '@nestjs/common';
import { MicroservicesSharedDatabaseModule } from '@shop-project/microservices/shared/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroservicesSharedEventBusModule } from "@shop-project/microservices/shared/event-bus";

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
