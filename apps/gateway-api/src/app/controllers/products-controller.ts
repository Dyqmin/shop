import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth0Guard, EmployeeAuth0Guard } from '@shop-project/api/auth';
import {
  insertProductsSchema,
  selectProductsSchema,
} from '@shop-project/microservices/catalog/schema';
import { NewProduct, Product } from '@shop-project/microservices/catalog/types';
import { LineItemPayload, lineItemPayloadSchema } from '@shop-project/microservices/orders/types';
import { zodToOpenAPI } from 'nestjs-zod';
import { ProductsService } from '../services/products.service';

@Controller('products')
@ApiTags('products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({
    schema: zodToOpenAPI(selectProductsSchema),
  })
  @ApiQuery({ name: 'ids', required: false, type: String })
  @UseGuards(Auth0Guard)
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
  @UseGuards(Auth0Guard)
  getProduct(@Param('id') id: number) {
    return this.productsService.getProduct(id);
  }

  @Post('availability')
  @ApiBody({
    schema: zodToOpenAPI(lineItemPayloadSchema),
  })
  @UseGuards(Auth0Guard)
  checkProductsAvailability(@Body() body: LineItemPayload) {
    return this.productsService.checkProductsAvailability(body);
  }

  @Post()
  @ApiBody({
    schema: zodToOpenAPI(insertProductsSchema),
  })
  @UseGuards(EmployeeAuth0Guard)
  insertProducts(@Body() product: NewProduct) {
    return this.productsService.insertProduct(product);
  }

  @Put(':id')
  @ApiBody({
    schema: zodToOpenAPI(insertProductsSchema),
  })
  @UseGuards(EmployeeAuth0Guard)
  editProducts(@Body() product: Product) {
    return this.productsService.editProduct(product);
  }
}
