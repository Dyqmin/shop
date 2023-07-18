import { InferModel } from "drizzle-orm";
import { products } from "@shop-project/microservices/catalog/schema";

export type Product = InferModel<typeof products>;
export type NewProduct = InferModel<typeof products, 'insert'>;
