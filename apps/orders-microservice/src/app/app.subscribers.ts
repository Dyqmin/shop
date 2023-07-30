import { Injectable } from "@nestjs/common";
import { RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { NewCustomer, NewLineItem, NewOrder, NewShipment } from "@shop-project/microservices/orders/types";
import { AppService } from "./app.service";

@Injectable()
export class AppSubscribers {
  constructor(private readonly appService: AppService) {}

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'insert-order',
    queue: 'orders_queue',
    queueOptions: {
      durable: false
    }
  })
  insertOrder(data: { order: NewOrder }) {
    return this.appService.insertOrder(data.order);
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'insert-line-items',
    queue: 'orders_queue',
    queueOptions: {
      durable: false
    }
  })
  insertLineItems(data: { lineItems: NewLineItem[] }) {
    return this.appService.insertLineItems(data.lineItems);
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'insert-customer',
    queue: 'orders_queue',
    queueOptions: {
      durable: false
    }
  })
  insertCustomer(data: { newCustomer: NewCustomer }) {
    return this.appService.insertCustomer(data.newCustomer);
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'insert-shipment',
    queue: 'orders_queue',
    queueOptions: {
      durable: false
    }
  })
  insertShipment(data: { newShipment: NewShipment }) {
    return this.appService.insertShipment(data.newShipment);
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'get-order',
    queue: 'orders_queue',
    queueOptions: {
      durable: false
    }
  })
  getOrder(data: { id: number }) {
    return this.appService.getOrder(data.id);
  }

  @RabbitRPC({
    exchange: 'event-exchange',
    routingKey: 'get-orders',
    queue: 'orders_queue',
    queueOptions: {
      durable: false
    }
  })
  getOrders(data: { userId: string }) {
    return this.appService.getOrders(data.userId);
  }
}
