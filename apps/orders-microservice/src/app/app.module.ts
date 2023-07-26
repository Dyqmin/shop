import { Module } from '@nestjs/common';
import { MicroservicesSharedDatabaseModule } from '@shop-project/microservices/shared/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MicroservicesSharedDatabaseModule.forRoot({
      port: '5433',
      user: 'postgres',
      password: 'postgres',
      host: 'localhost',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
