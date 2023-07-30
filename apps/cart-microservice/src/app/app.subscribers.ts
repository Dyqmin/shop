import { Injectable } from "@nestjs/common";
import { RabbitRPC, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { OrderCreatedEventData } from "@shop-project/microservices/shared/event-bus";
import { AppService } from "./app.service";

@Injectable()
export class AppSubscribers {
  constructor(private readonly _cartService: AppService) {}

  @RabbitSubscribe({
    exchange: 'event-exchange',
    routingKey: 'order-created',
    queue: 'event-bus-orders',
  })
  async handleOrderCreated(data: OrderCreatedEventData) {
    try {
      await this._cartService.clearCart(data.userId);
    } catch (e) {
      console.log('Error while processing handleOrderCreated');
      console.log(e);
    }
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'add-or-modify-cart-item',
    queue: 'cart-queue',
  })
  addOrModify(data: { userId: string; productId: number; product: string; quantity: number; }) {
    return this._cartService.setCart(data.userId, {
      [data.productId]: JSON.stringify({
        product: data.product,
        quantity: data.quantity,
      })
    });
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'get-cart',
    queue: 'cart-queue',
  })
  getCart(data: { id: string }) {
    return this._cartService.getCart(data.id);
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'remove-cart-item',
    queue: 'cart-queue',
  })
  removeCartItem(data: { userId: string; productId: string; }) {
    return this._cartService.removeItem(data.userId, data.productId);
  }
}
