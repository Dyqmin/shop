DO $$ BEGIN
 CREATE TYPE "order_status_enum" AS ENUM('pending', 'shipped', 'preparing');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "payment_status_enum" AS ENUM('pending', 'paid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "order_line_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"unit_price" numeric NOT NULL,
	"quantity" integer NOT NULL,
	"subtotal" numeric NOT NULL
);

CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" varchar NOT NULL,
	"status" "order_status_enum" DEFAULT 'pending' NOT NULL,
	"date" date DEFAULT CURRENT_DATE NOT NULL,
	"payment_status" "payment_status_enum" DEFAULT 'pending' NOT NULL,
	"total_amount" numeric NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "order_line_items" ADD CONSTRAINT "order_line_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
