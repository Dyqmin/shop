DO $$ BEGIN
 CREATE TYPE "currency_enum" AS ENUM('PLN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "products" ALTER COLUMN "price" SET NOT NULL;
ALTER TABLE "products" ADD COLUMN "is_featured" boolean DEFAULT false NOT NULL;
ALTER TABLE "products" ADD COLUMN "currency" "currency_enum" DEFAULT 'PLN' NOT NULL;
ALTER TABLE "products" ADD COLUMN "quantity" integer DEFAULT 1 NOT NULL;