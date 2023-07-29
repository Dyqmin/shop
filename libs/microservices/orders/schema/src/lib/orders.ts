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

export const orderCustomers = pgTable('order_customers', {
  orderId: integer('order_id')
  .notNull()
  .references(() => orders.id),
  name: varchar('name').notNull(),
  street: varchar('street').notNull(),
  city: varchar('city').notNull(),
  zipCode: varchar('zip_code').notNull(),
  phone: varchar('phone'),
  taxNumber: varchar('tax_number'),
});

export const ordersCustomerRelations = relations(orders, ({ one }) => ({
  orderCustomers: one(orderCustomers, {
    fields: [orders.id],
    references: [orderCustomers.orderId],
  }),
}));

export const orderShipments = pgTable('order_shipments', {
  orderId: integer('order_id')
    .notNull()
    .references(() => orders.id),
  name: varchar('name').notNull(),
  street: varchar('street').notNull(),
  city: varchar('city').notNull(),
  zipCode: varchar('zip_code').notNull(),
  phone: varchar('phone').notNull(),
});

export const ordersShipmentsRelations = relations(orders, ({ one }) => ({
  orderShipments: one(orderShipments, {
    fields: [orders.id],
    references: [orderShipments.orderId],
  }),
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
