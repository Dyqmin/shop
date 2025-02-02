import {
  orderCustomers,
  orderLineItems,
  orders,
  orderShipments, orderStatus,
} from '@shop-project/microservices/orders/schema';
import { InferModel, WithEnum } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { selectProductsSchema } from "@shop-project/microservices/catalog/schema";

export type NewOrderLineItem = InferModel<typeof orderLineItems, 'insert'>;

export const selectOrdersSchema = createSelectSchema(orders);
export const selectLineItemsSchema = createSelectSchema(orderLineItems);
export const insertOrderSchema = createInsertSchema(orders);
export const insertLineItemsSchema = createInsertSchema(orderLineItems);
export const selectOrderCustomersSchema = createSelectSchema(orderCustomers);
export const insertOrderCustomersSchema = createInsertSchema(orderCustomers);
export const insertOrderShipmentsSchema = createInsertSchema(orderShipments);
export const selectOrderShipmentsSchema = createSelectSchema(orderShipments);

export const lineItemPayloadSchema = z.array(
  insertLineItemsSchema.pick({ quantity: true, productId: true })
);

export const insertOrderShipmentsPayload = insertOrderShipmentsSchema.omit({ orderId: true })
export const insertOrderCustomersPayload = insertOrderCustomersSchema.omit({ orderId: true })

export const insertOrderWithLineItemsDtoSchema = z.object({
  // order: insertOrderSchema,
  lineItems: lineItemPayloadSchema,
  shipment: insertOrderShipmentsPayload,
  customer: insertOrderCustomersPayload,
});

export const orderWithLineItems = selectOrdersSchema.merge(
  z.object({ orderLineItems: z.array(selectLineItemsSchema), orderCustomers: selectOrderCustomersSchema, orderShipments: selectOrderShipmentsSchema })
);
export const lineItemView = selectLineItemsSchema.merge(z.object({ product: selectProductsSchema }));
export const orderView = selectOrdersSchema.merge(
  z.object({ orderLineItems: z.array(lineItemView), orderCustomers: selectOrderCustomersSchema, orderShipments: selectOrderShipmentsSchema })
);

export type NewOrderDto = z.infer<typeof insertOrderWithLineItemsDtoSchema>;
export type NewOrder = z.infer<typeof insertOrderSchema>;
export type EditOrderDto = z.infer<typeof insertOrderSchema>;
export type NewLineItem = z.infer<typeof insertLineItemsSchema>;
export type OrderShipment = z.infer<typeof selectOrderShipmentsSchema>;
export type OrderCustomer = z.infer<typeof selectOrderCustomersSchema>;
export type NewCustomer = z.infer<typeof insertOrderCustomersSchema>;
export type NewCustomerPayload = z.infer<typeof insertOrderCustomersPayload>;
export type NewShipment = z.infer<typeof insertOrderShipmentsSchema>;
export type NewShipmentPayload = z.infer<typeof insertOrderShipmentsPayload>;
export type LineItemPayload = z.infer<typeof lineItemPayloadSchema>;
export type Order = z.infer<typeof selectOrdersSchema>;
export type LineItem = z.infer<typeof selectLineItemsSchema>;
export type OrderWithLineItem = z.infer<typeof orderWithLineItems>;
export type OrderView = z.infer<typeof orderView>;
export type LineItemView = z.infer<typeof lineItemView>;

export const statusSchema = selectOrdersSchema.shape.status;
export const statusSchemaValues = statusSchema.Values;
export const paymentStatusSchema = selectOrdersSchema.shape.paymentStatus;
export const paymentStatusValues = paymentStatusSchema.Values;
export type OrderStatus = z.infer<typeof statusSchema>;
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
