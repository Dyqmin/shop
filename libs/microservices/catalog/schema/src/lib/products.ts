import { pgTable, serial, varchar, numeric } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("product_name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  price: numeric("price"),
});
