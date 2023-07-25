import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { orders } from "@shop-project/microservices/orders/schema";

export const selectOrdersSchema = createSelectSchema(orders);
export const insertOrdersSchema = createInsertSchema(orders);
