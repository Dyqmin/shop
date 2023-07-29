CREATE TABLE IF NOT EXISTS "order_customers" (
	"order_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"street" varchar NOT NULL,
	"city" varchar NOT NULL,
	"zip_code" varchar NOT NULL,
	"phone" varchar,
	"tax_number" varchar
);

CREATE TABLE IF NOT EXISTS "order_shipments" (
	"order_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"street" varchar NOT NULL,
	"city" varchar NOT NULL,
	"zip_code" varchar NOT NULL,
	"phone" varchar NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "order_customers" ADD CONSTRAINT "order_customers_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "order_shipments" ADD CONSTRAINT "order_shipments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
