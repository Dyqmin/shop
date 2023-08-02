import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewProduct, Product } from '@shop-project/microservices/catalog/types';
import {
  insertProductsSchema,
  selectProductsSchema,
} from '@shop-project/microservices/catalog/schema';
import { zodToOpenAPI } from 'nestjs-zod';
import { Auth0Guard } from '@shop-project/api/auth';
import { ProductsService } from '../services/products.service';
import { LineItemPayload, lineItemPayloadSchema } from "@shop-project/microservices/orders/types";

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({
    schema: zodToOpenAPI(selectProductsSchema),
  })
  @ApiQuery({ name: 'ids', required: false, type: String })
  // @UseGuards(Auth0Guard)
  getProducts(@Query('ids') ids?: string) {
    if (ids) {
      const parsedIds = ids.split(',').map(Number);
      return this.productsService.getProductsByIds(parsedIds);
    }
    return this.productsService.getProducts();
  }

  @Get(':id')
  @ApiResponse({
    schema: zodToOpenAPI(selectProductsSchema),
  })
  getProduct(@Param('id') id: number) {
    return this.productsService.getProduct(id);
  }

  @Post('availability')
  @ApiBody({
    schema: zodToOpenAPI(lineItemPayloadSchema),
  })
  checkProductsAvailability(@Body() body: LineItemPayload) {
    return this.productsService.checkProductsAvailability(body);
  }

  @Post()
  @ApiBody({
    schema: zodToOpenAPI(insertProductsSchema),
  })
  insertProducts(@Body() product: NewProduct) {
    return this.productsService.insertProduct(product);
  }

  @Put(':id')
  @ApiBody({
    schema: zodToOpenAPI(insertProductsSchema),
  })
  editProducts(@Body() product: Product) {
    return this.productsService.editProduct(product);
  }
}
