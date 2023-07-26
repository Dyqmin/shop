import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products-controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiAuthModule } from '@shop-project/api/auth';
import { CartController } from './controllers/cart.controller';
import { OrdersController } from './controllers/orders.controller';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    ApiAuthModule,
    ClientsModule.register([
      {
        name: 'CART_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cart_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'products_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'orders_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductsController, CartController, OrdersController],
  providers: [ProductsService, OrdersService],
})
export class AppModule {}
