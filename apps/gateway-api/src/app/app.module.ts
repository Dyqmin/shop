import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products-controller';
import { ApiAuthModule } from '@shop-project/api/auth';
import { CartController } from './controllers/cart.controller';
import { OrdersController } from './controllers/orders.controller';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';
import { MicroservicesSharedEventBusModule } from "@shop-project/microservices/shared/event-bus";

@Module({
  imports: [
    ApiAuthModule,
    MicroservicesSharedEventBusModule,
  ],
  controllers: [ProductsController, CartController, OrdersController],
  providers: [ProductsService, OrdersService],
})
export class AppModule {}
