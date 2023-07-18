CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_name" varchar(256) NOT NULL,
	"description" varchar(256),
	"price" numeric
);
