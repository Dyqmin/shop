import { Injectable } from '@nestjs/common';
import {NewProduct, Product} from "@shop-project/microservices/catalog/types";
import {products} from "@shop-project/microservices/catalog/schema";
import {DatabaseService} from "@shop-project/microservices/shared/database";
import {eq} from "drizzle-orm";

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
}
