import { Injectable } from '@nestjs/common';
import { products } from '@shop-project/microservices/catalog/schema';
import { NewProduct, Product } from '@shop-project/microservices/catalog/types';
import { DatabaseService } from '@shop-project/microservices/shared/database';
import { eq, inArray, sql } from 'drizzle-orm';

@Injectable()
export class AppService {
  constructor(private readonly _db: DatabaseService) {}

  async getProducts(): Promise<Product[]> {
    return this._db.db.select().from(products);
  }

  async getProduct(id: number): Promise<Product[]> {
    return this._db.db.select().from(products).where(eq(products.id, id));
  }

  async insertProduct(product: NewProduct): Promise<Product[]> {
    try {
      return await this._db.db.insert(products).values(product).returning().catch();
    } catch (err) {
      return err;
    }
  }

  async reduceProductQuantity(lineItem: { productId: number; quantity: number }) {
    try {
      return await this._db.db
        .update(products)
        .set({
          quantity: sql`${products.quantity} - ${lineItem.quantity}`,
        })
        .where(eq(products.id, lineItem.productId));
    } catch (err) {
      return err;
    }
  }

  getProductsByIds(ids: number[]) {
    return this._db.db.select().from(products).where(inArray(products.id, ids));
  }

  async checkProductsAvailability(data: { products: { productId: number; quantity: number }[] }) {
    const ids = data.products.map(product => product.productId);
    const dbProducts = await this._db.db.select().from(products).where(inArray(products.id, ids));

    let ok = true;

    dbProducts.forEach(dbProduct => {
      const requestedProduct = data.products.find(reqP => reqP.productId === dbProduct.id);

      if (requestedProduct?.quantity && requestedProduct.quantity > dbProduct.quantity) {
        ok = false;
      }
    });

    return ok;
  }
}
