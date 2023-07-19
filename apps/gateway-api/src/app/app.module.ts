import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import {ProductsController} from "./controllers/products-controller";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      // {
      //   name: 'CART_SERVICE',
      //   transport: Transport.RMQ,
      //   options: {
      //     urls: ['amqp://localhost:5672'],
      //     queue: 'cart_queue',
      //     queueOptions: {
      //       durable: false
      //     },
      //   },
      // },
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'products_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [AppController, ProductsController],
})
export class AppModule {}
