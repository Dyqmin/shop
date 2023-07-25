import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MicroservicesSharedDatabaseModule} from "@shop-project/microservices/shared/database";

@Module({
  imports: [
      MicroservicesSharedDatabaseModule.forRoot({
        port: '5432',
        user: 'postgres',
        password: 'postgres',
        host: 'localhost'
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
