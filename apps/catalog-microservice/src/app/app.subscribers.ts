import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { lineItemPayloadSchema } from '@shop-project/microservices/orders/types';
import { AppService } from './app.service';
import { ProductsOrderedEventData } from "@shop-project/microservices/shared/event-bus";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { NewProduct } from "@shop-project/microservices/catalog/types";

@Injectable()
export class AppSubscribers {
  constructor(private readonly _productsService: AppService) {}

  @RabbitSubscribe({
    exchange: 'event-exchange',
    routingKey: 'products-ordered',
    queue: 'event-bus-products',
  })
  handleProductsOrdered(data: ProductsOrderedEventData) {
    try {
      const lineItems = lineItemPayloadSchema.parse(data.lineItems);
      lineItems.forEach(lineItem => {
        this._productsService.reduceProductQuantity(lineItem);
      });
    } catch (e) {
      console.log('Error while processing handleProductsOrdered');
    }
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'get-products',
    queue: 'products-queue',
  })
  getProducts() {
    return this._productsService.getProducts();
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'get-product',
    queue: 'products-queue',
  })
  getProduct(data: { id: number }) {
    return this._productsService.getProduct(data.id);
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'get-products-by-ids',
    queue: 'products-queue',
  })
  getProductsByIds(data: { ids: number[] }) {
    return this._productsService.getProductsByIds(data.ids);
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'insert-product',
    queue: 'products-queue',
  })
  insertProduct(data: { product: NewProduct }) {
    return this._productsService.insertProduct(data.product);
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'are-products-available',
    queue: 'products-queue',
  })
  checkProductsAvailability(@Payload() data: { products: { productId: number; quantity: number }[] }) {
    return this._productsService.checkProductsAvailability(data);
  }
}
