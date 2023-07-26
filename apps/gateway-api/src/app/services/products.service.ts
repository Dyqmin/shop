import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NewProduct, Product } from '@shop-project/microservices/catalog/types';

@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCTS_SERVICE') private readonly c: ClientProxy) {}

  getProduct(id: number) {
    return this.c.send<Product[], { id: number }>({ cmd: 'getProduct' }, { id });
  }

  getProducts() {
    return this.c.send<Product[]>({ cmd: 'getProducts' }, {});
  }

  getProductsByIds(ids: number[]) {
    return this.c.send<Product[], { ids: number[] }>({ cmd: 'getProductsByIds' }, { ids });
  }

  insertProduct(product: NewProduct) {
    return this.c.send<Product, { product: NewProduct }>({ cmd: 'insertProduct' }, { product });
  }
}
