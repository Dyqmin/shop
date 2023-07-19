import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { ClientProxy } from "@nestjs/microservices";
import {ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";
import {NewProduct} from "@shop-project/microservices/catalog/types";
import {insertProductsSchema, selectProductsSchema} from "@shop-project/microservices/catalog/schema";
import {zodToOpenAPI,} from "nestjs-zod";

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(@Inject('PRODUCTS_SERVICE') private readonly c: ClientProxy) {}

  @Get()
  @ApiResponse({
    schema: zodToOpenAPI(selectProductsSchema)
  })
  getProducts() {
    return this.c.send({ cmd: 'getProducts' }, {});
  }

  @Post()
  @ApiBody({
    schema: zodToOpenAPI(insertProductsSchema),
  })
  insertProducts(@Body() product: NewProduct) {
    return this.c.send({ cmd: 'insertProducts' }, { product });
  }
}
