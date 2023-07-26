import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LineItem, NewLineItem, NewOrder, Order, OrderWithLineItem } from "@shop-project/microservices/orders/types";

@Injectable()
export class OrdersService {
  constructor(@Inject('ORDERS_SERVICE') private readonly c: ClientProxy) {}

  getOrder(id: number) {
    return this.c.send<OrderWithLineItem>({ cmd: 'getOrder' }, { id });
  }

  insertOrder(order: NewOrder) {
    return this.c.send<Order, { order: NewOrder }>({ cmd: 'insertOrder' }, { order });
  }

  insertLineItems(lineItems: NewLineItem[]) {
    return this.c.send<LineItem, { lineItems: NewLineItem[] }>({ cmd: 'insertLineItems' }, { lineItems });
  }
}
