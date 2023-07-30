import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  LineItem,
  NewCustomer,
  NewLineItem,
  NewOrder,
  NewShipment,
  Order,
  OrderCustomer,
  OrderShipment,
  OrderWithLineItem,
} from '@shop-project/microservices/orders/types';
import { fromPromise } from "rxjs/internal/observable/innerFrom";

@Injectable()
export class OrdersService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  getOrders(userId: string) {
    return this.amqpConnection.request<Order[]>({
      exchange: 'event-exchange',
      routingKey: 'get-orders',
      payload: { userId },
    });
  }

  getOrder(id: number) {
    return this.amqpConnection.request<OrderWithLineItem>({
      exchange: 'event-exchange',
      routingKey: 'get-order',
      payload: { id },
    });
  }

  insertOrder(order: NewOrder) {
    return fromPromise(this.amqpConnection.request<Order>({
      exchange: 'event-exchange',
      routingKey: 'insert-order',
      payload: { order },
    }));
  }

  insertLineItems(lineItems: NewLineItem[]) {
    return fromPromise(this.amqpConnection.request<LineItem>({
      exchange: 'event-exchange',
      routingKey: 'insert-line-items',
      payload: { lineItems },
    }));
  }

  insertCustomer(newCustomer: NewCustomer) {
    return fromPromise(this.amqpConnection.request<OrderCustomer>({
      exchange: 'event-exchange',
      routingKey: 'insert-customer',
      payload: { newCustomer },
    }));
  }

  insertShipment(newShipment: NewShipment) {
    return fromPromise(this.amqpConnection.request<OrderShipment>({
      exchange: 'event-exchange',
      routingKey: 'insert-shipment',
      payload: { newShipment },
    }));
  }
}
