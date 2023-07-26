import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  insertOrderWithLineItemsDtoSchema,
  NewLineItem,
  NewOrderDto,
  orderWithLineItems,
} from '@shop-project/microservices/orders/types';
import { zodToOpenAPI } from 'nestjs-zod';
import { combineLatest, iif, map, of, switchMap, throwError } from 'rxjs';
import { OrdersService } from '../services/orders.service';
import { ProductsService } from '../services/products.service';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(
    private readonly _ordersService: OrdersService,
    private readonly _productsService: ProductsService
  ) {}

  @Get(':id')
  @ApiResponse({
    schema: zodToOpenAPI(orderWithLineItems),
  })
  // @UseGuards(Auth0Guard)
  getOrder(@Param('id') id: number) {
    return this._ordersService.getOrder(id);
  }

  @Post()
  @ApiBody({
    schema: zodToOpenAPI(insertOrderWithLineItemsDtoSchema),
  })
  insertProducts(@Body() orderDto: NewOrderDto) {
    const productIds = orderDto.lineItems.map(lineItem => lineItem.productId);

    const insertOrder$ = this._ordersService.insertOrder(orderDto.order).pipe(
      switchMap(order =>
        combineLatest([
          of(order),
          this._productsService.getProductsByIds(productIds).pipe(
            switchMap(products => {
              const lineItems: NewLineItem[] = orderDto.lineItems.map(lineItem => {
                const product = products.find(p => p.id === lineItem.productId);
                return {
                  ...lineItem,
                  productId: product!.id,
                  orderId: order.id,
                  quantity: lineItem.quantity,
                  unitPrice: product!.price,
                  // todo fix this toString
                  subTotal: (+product!.price * lineItem.quantity).toString(),
                };
              });
              return this._ordersService.insertLineItems(lineItems);
            })
          ),
        ])
      ),
      map(([order, lineItems]) => ({ ...order, lineItems }))
    );

    return this._productsService.checkProductsAvailability(orderDto.lineItems).pipe(
      switchMap(resp =>
        iif(
          () => resp,
          insertOrder$,
          throwError(() => new HttpException('Not enough products!', HttpStatus.FORBIDDEN))
        )
      )
    );
  }
}
