import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  orderCustomers,
  orderLineItems,
  orderLineItemsRelations,
  orders,
  orderShipments,
  ordersRelations,
} from '@shop-project/microservices/orders/schema';
import {
  NewCustomer,
  NewLineItem,
  NewOrder,
  NewShipment,
} from '@shop-project/microservices/orders/types';
import { DatabaseService } from '@shop-project/microservices/shared/database';
import {
  OrderCreatedEventData,
  ProductsOrderedEventData,
} from '@shop-project/microservices/shared/event-bus';
import { eq } from 'drizzle-orm';

@Injectable()
export class AppService {
  constructor(
    private readonly _db: DatabaseService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  async insertOrder(order: NewOrder) {
    try {
      const result = await this._db.db.insert(orders).values(order).returning().catch();

      console.log(order.customerId);
      this.amqpConnection.publish<OrderCreatedEventData>('event-exchange', 'order-created', {
        userId: order.customerId,
      });

      return result[0];
    } catch (err) {
      return err;
    }
  }

  async insertCustomer(newCustomer: NewCustomer) {
    try {
      const result = await this._db.db
        .insert(orderCustomers)
        .values(newCustomer)
        .returning()
        .catch();
      return result[0];
    } catch (err) {
      return err;
    }
  }

  async insertShipment(newShipment: NewShipment) {
    try {
      const result = await this._db.db
        .insert(orderShipments)
        .values(newShipment)
        .returning()
        .catch();
      return result[0];
    } catch (err) {
      return err;
    }
  }

  async insertLineItems(lineItems: NewLineItem[]) {
    try {
      const result = await this._db.db.insert(orderLineItems).values(lineItems).returning().catch();

      this.amqpConnection.publish<ProductsOrderedEventData>('event-exchange', 'products-ordered', {
        lineItems,
      });

      return result;
    } catch (err) {
      return err;
    }
  }

  getOrder(id: number) {
    return this._db
      .getDb({
        orders,
        orderLineItems,
        ordersRelations,
        orderLineItemsRelations,
        orderCustomers,
        orderShipments,
      })
      .query.orders.findFirst({
        where: eq(orders.id, id),
        with: {
          orderLineItems: true,
          orderShipments: true,
          orderCustomers: true,
        },
      });
  }

  getOrders(userId: string) {
    return this._db.db.select().from(orders).where(eq(orders.customerId, userId));
  }
}
