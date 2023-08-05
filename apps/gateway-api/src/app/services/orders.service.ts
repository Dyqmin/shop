import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Product } from '@shop-project/microservices/catalog/types';
import {
  EditOrderDto,
  LineItem,
  NewCustomer,
  NewLineItem,
  NewOrder,
  NewShipment,
  Order,
  OrderCustomer,
  OrderShipment,
  OrderView,
  OrderWithLineItem,
} from '@shop-project/microservices/orders/types';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

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

  async getOrder(id: number) {
    const order = await this.amqpConnection.request<OrderWithLineItem>({
      exchange: 'event-exchange',
      routingKey: 'get-order',
      payload: { id },
    });

    const ids = order.orderLineItems.map(lineItem => lineItem.productId);
    const products = await this.amqpConnection.request<Product[]>({
      exchange: 'event-exchange',
      routingKey: 'get-products-by-ids',
      payload: { ids },
    });

    const resp: OrderView = {
      ...order,
      orderLineItems: order.orderLineItems.map(li => ({
        ...li,
        product: products.find(p => p.id === li.productId)!,
      })),
    };

    return resp;
  }

  insertOrder(order: NewOrder) {
    return fromPromise(
      this.amqpConnection.request<Order>({
        exchange: 'event-exchange',
        routingKey: 'insert-order',
        payload: { order },
      })
    );
  }

  insertLineItems(lineItems: NewLineItem[]) {
    return fromPromise(
      this.amqpConnection.request<LineItem>({
        exchange: 'event-exchange',
        routingKey: 'insert-line-items',
        payload: { lineItems },
      })
    );
  }

  insertCustomer(newCustomer: NewCustomer) {
    return fromPromise(
      this.amqpConnection.request<OrderCustomer>({
        exchange: 'event-exchange',
        routingKey: 'insert-customer',
        payload: { newCustomer },
      })
    );
  }

  insertShipment(newShipment: NewShipment) {
    return fromPromise(
      this.amqpConnection.request<OrderShipment>({
        exchange: 'event-exchange',
        routingKey: 'insert-shipment',
        payload: { newShipment },
      })
    );
  }

  editOrder(id: number, order: EditOrderDto) {
    return fromPromise(
      this.amqpConnection.request<Order>({
        exchange: 'event-exchange',
        routingKey: 'edit-order',
        payload: { id, order },
      })
    );
  }
}
