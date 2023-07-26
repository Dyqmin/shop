import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { NewProduct } from '@shop-project/microservices/catalog/types';

@Controller()
export class AppController {
  constructor(private readonly _productsService: AppService) {}

  @MessagePattern({ cmd: 'getProducts' })
  getProducts() {
    return this._productsService.getProducts();
  }

  @MessagePattern({ cmd: 'getProductsByIds' })
  getProductsByIds(@Payload() data: { ids: number[] }) {
    return this._productsService.getProductsByIds(data.ids);
  }

  @MessagePattern({ cmd: 'getProduct' })
  getProduct(@Payload() data: { id: number }) {
    return this._productsService.getProduct(data.id);
  }

  @MessagePattern({ cmd: 'insertProduct' })
  insertProduct(@Payload() data: { product: NewProduct }, @Ctx() context: RmqContext) {
    return this._productsService.insertProduct(data.product);
  }

  @MessagePattern({ cmd: 'checkProductsAvailability' })
  checkProductsAvailability(@Payload() data: { products: { productId: number; quantity: number }[] }) {
    return this._productsService.checkProductsAvailability(data);
  }
}
