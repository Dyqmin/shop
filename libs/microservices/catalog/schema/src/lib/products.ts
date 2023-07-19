import { pgTable, serial, varchar, numeric } from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  price: numeric("price"),
  imageUrl: varchar("image_url"),
});

export const selectProductsSchema = createSelectSchema(products);
export const insertProductsSchema = createInsertSchema(products);
