import {
  orderLineItems,
  orderLineItemsRelations,
  orders,
  ordersRelations
} from '@shop-project/microservices/orders/schema';
import { NewLineItem, NewOrder } from '@shop-project/microservices/orders/types';
import { DatabaseService } from '@shop-project/microservices/shared/database';
import { eq } from 'drizzle-orm';
import { Injectable } from '@nestjs/common';
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { ProductsOrderedEventData } from "@shop-project/microservices/shared/event-bus";

@Injectable()
export class AppService {
  constructor(private readonly _db: DatabaseService, private readonly amqpConnection: AmqpConnection) {}

  async insertOrder(order: NewOrder) {
    try {
      const result = await this._db.db.insert(orders).values(order).returning().catch();
      return result[0];
    } catch (err) {
      return err;
    }
  }

  async insertLineItems(lineItems: NewLineItem[]) {
    this.amqpConnection.publish<ProductsOrderedEventData>('event-exchange', 'products-ordered', { lineItems });

    try {
      return await this._db.db.insert(orderLineItems).values(lineItems).returning().catch();
    } catch (err) {
      return err;
    }
  }

  getOrder(id: number) {
    return this._db.getDb({ orders, orderLineItems, ordersRelations, orderLineItemsRelations }).query.orders.findFirst({
      where: eq(orders.id, id),
      with: {
        orderLineItems: true
      }
    });
  }
}
