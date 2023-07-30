import { Injectable } from "@nestjs/common";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { OrderCreatedEventData } from "@shop-project/microservices/shared/event-bus";
import { AppService } from "./app.service";

@Injectable()
export class AppSubscribers {
  constructor(private readonly _appService: AppService) {}

  @RabbitSubscribe({
    exchange: 'event-exchange',
    routingKey: 'order-created',
    queue: 'event-bus-orders',
  })
  async handleOrderCreated(data: OrderCreatedEventData) {
    try {
      await this._appService.clearCart(data.userId);
    } catch (e) {
      console.log('Error while processing handleOrderCreated');
      console.log(e);
    }
  }
}
