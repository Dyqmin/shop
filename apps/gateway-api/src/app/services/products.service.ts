import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { NewProduct, Product } from '@shop-project/microservices/catalog/types';
import { LineItemPayload } from '@shop-project/microservices/orders/types';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

@Injectable()
export class ProductsService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  getProduct(id: number) {
    return this.amqpConnection.request<Product>({
      exchange: 'event-exchange',
      routingKey: 'get-product',
      payload: { id },
    });
  }

  getProducts() {
    return this.amqpConnection.request<Product[]>({
      exchange: 'event-exchange',
      routingKey: 'get-products',
    });
  }

  getProductsByIds(ids: number[]) {
    return fromPromise(
      this.amqpConnection.request<Product[]>({
        exchange: 'event-exchange',
        routingKey: 'get-products-by-ids',
        payload: { ids },
      })
    );
  }

  insertProduct(product: NewProduct) {
    return fromPromise(
      this.amqpConnection.request<Product>({
        exchange: 'event-exchange',
        routingKey: 'insert-product',
        payload: { product },
      })
    );
  }

  editProduct(product: Product) {
    return fromPromise(
      this.amqpConnection.request<Product>({
        exchange: 'event-exchange',
        routingKey: 'edit-product',
        payload: { product },
      })
    );
  }

  checkProductsAvailability(lineItemPayload: LineItemPayload) {
    return fromPromise(
      this.amqpConnection.request<boolean>({
        exchange: 'event-exchange',
        routingKey: 'are-products-available',
        payload: { products: lineItemPayload },
      })
    );
  }
}
