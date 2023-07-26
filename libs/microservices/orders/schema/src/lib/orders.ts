import { relations, sql } from 'drizzle-orm';
import { date, decimal, integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const orderStatus = pgEnum('order_status_enum', ['pending', 'shipped', 'preparing']);
export const paymentStatus = pgEnum('payment_status_enum', ['pending', 'paid']);

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerId: varchar('customer_id').notNull(),
  status: orderStatus('status').notNull().default('pending'),
  date: date('date')
    .notNull()
    .default(sql`CURRENT_DATE`),
  paymentStatus: paymentStatus('payment_status').notNull().default('pending'),
  totalAmount: decimal('total_amount').notNull(),
});

export const ordersRelations = relations(orders, ({ many }) => ({
  orderLineItems: many(orderLineItems),
}));

export const orderLineItems = pgTable('order_line_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id')
    .notNull()
    .references(() => orders.id),
  productId: integer('product_id').notNull(),
  unitPrice: decimal('unit_price').notNull(),
  quantity: integer('quantity').notNull(),
  subTotal: decimal('subtotal').notNull(),
});

export const orderLineItemsRelations = relations(orderLineItems, ({ one }) => ({
  order: one(orders, { fields: [orderLineItems.orderId], references: [orders.id] }),
}));
