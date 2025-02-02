import { NewLineItem } from "@shop-project/microservices/orders/types";

export type ProductsOrderedEventData = { lineItems: NewLineItem[] };
export type OrderCreatedEventData = { userId: string };
