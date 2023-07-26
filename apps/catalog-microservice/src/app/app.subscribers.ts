import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { lineItemPayloadSchema } from '@shop-project/microservices/orders/types';
import { AppService } from './app.service';
import { ProductsOrderedEventData } from "@shop-project/microservices/shared/event-bus";

@Injectable()
export class AppSubscribers {
  constructor(private readonly _appService: AppService) {}

  @RabbitSubscribe({
    exchange: 'event-exchange',
    routingKey: 'products-ordered',
    queue: 'event-bus',
  })
  handleProductsOrdered(data: ProductsOrderedEventData) {
    try {
      const lineItems = lineItemPayloadSchema.parse(data.lineItems);
      lineItems.forEach(lineItem => {
        this._appService.reduceProductQuantity(lineItem);
      });
    } catch (e) {
      console.log('Error while processing handleProductsOrdered');
    }
  }
}
