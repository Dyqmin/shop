import { pgTable, serial, varchar, numeric, boolean, pgEnum, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const currencyEnum = pgEnum('currency_enum', ['PLN']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }),
  price: numeric('price').notNull(),
  imageUrl: varchar('image_url'),
  isFeatured: boolean('is_featured').notNull().default(false),
  currency: currencyEnum('currency').notNull().default('PLN'),
  quantity: integer('quantity').notNull().default(1),
});

export const selectProductsSchema = createSelectSchema(products);
export const insertProductsSchema = createInsertSchema(products);
