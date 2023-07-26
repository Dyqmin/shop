import { createInsertSchema, createSelectSchema,  } from "drizzle-zod";
import { orderLineItems, orders } from "@shop-project/microservices/orders/schema";
import { InferModel } from "drizzle-orm";
import { z } from 'zod';

export type NewOrderLineItem = InferModel<typeof orderLineItems, 'insert'>;

export const selectOrdersSchema = createSelectSchema(orders);
export const selectLineItemsSchema = createSelectSchema(orderLineItems);
export const insertOrderSchema = createInsertSchema(orders);
export const insertLineItemsSchema = createInsertSchema(orderLineItems);

const lineItemPayloadSchema = insertLineItemsSchema.pick({ quantity: true, productId: true })

export const insertOrderWithLineItemsDtoSchema = z.object({
    order: insertOrderSchema,
    lineItems: z.array(lineItemPayloadSchema),
});

export const orderWithLineItems = selectOrdersSchema.merge(z.object({ orderLineItems: z.array(selectLineItemsSchema) }));

export type NewOrderDto = z.infer<typeof insertOrderWithLineItemsDtoSchema>;
export type NewOrder = z.infer<typeof insertOrderSchema>;
export type NewLineItem = z.infer<typeof insertLineItemsSchema>;
export type Order = z.infer<typeof selectOrdersSchema>;
export type LineItem = z.infer<typeof selectLineItemsSchema>;
export type OrderWithLineItem = z.infer<typeof orderWithLineItems>;

