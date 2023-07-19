import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from "./app.service";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import {NewProduct} from "@shop-project/microservices/catalog/types";

@Controller()
export class AppController {
  constructor(private readonly _productsService: AppService) {}

  @Get()
  getData() {
    return this._productsService.getProducts();
  }

  @Post()
  createProduct(@Body() product: NewProduct) {
    return this._productsService.insertProduct(product);
  }

  @MessagePattern({ cmd: 'getProducts' })
  getProducts() {
    return this._productsService.getProducts();
  }

  @MessagePattern({ cmd: 'insertProducts' })
  insertProduct(@Payload() data: { product: NewProduct }, @Ctx() context: RmqContext) {
    return this._productsService.insertProduct(data.product);
  }
}
