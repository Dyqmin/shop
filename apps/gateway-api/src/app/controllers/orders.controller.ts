import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth0Guard, User } from '@shop-project/api/auth';
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

  @Get()
  @ApiResponse({
    schema: zodToOpenAPI(orderWithLineItems),
  })
  @UseGuards(Auth0Guard)
  getOrders(@User() user: User) {
    return this._ordersService.getOrders(user.sub);
  }

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
  @UseGuards(Auth0Guard)
  insertOrder(@Body() orderDto: NewOrderDto, @User() user: User) {
    const productIds = orderDto.lineItems.map(lineItem => lineItem.productId);

    const getProductsData$ = this._productsService.getProductsByIds(productIds).pipe(
      map(products => {
        const lineItems: NewLineItem[] = [];
        orderDto.lineItems.forEach(lineItem => {
          const product = products.find(p => p.id === lineItem.productId);

          if (product) {
            lineItems.push({
              ...lineItem,
              productId: product.id,
              orderId: 0,
              quantity: lineItem.quantity,
              unitPrice: product.price,
              subTotal: (+product.price * lineItem.quantity).toString(),
            });
          }
        });
        const fullPrice = lineItems.reduce(
          (acc, lineItem) => parseFloat(lineItem.subTotal) + acc,
          0
        );

        return { lineItems, fullPrice };
      })
    );

    const createOrder$ = getProductsData$.pipe(
      switchMap(({ lineItems, fullPrice }) =>
        this._ordersService
          .insertOrder({ customerId: user.sub, totalAmount: fullPrice.toString() })
          .pipe(
            switchMap(order =>
              combineLatest([
                of(order),
                this._ordersService.insertLineItems(
                  lineItems.map(lineItem => ({ ...lineItem, orderId: order.id }))
                ),
                this._ordersService.insertCustomer({
                  ...orderDto.customer,
                  orderId: order.id,
                }),
                this._ordersService.insertShipment({
                  ...orderDto.shipment,
                  orderId: order.id,
                }),
              ])
            ),
            map(([order, lineItems, customer, shipment]) => ({ ...order, lineItems, customer, shipment }))
          )
      )
    );

    return this._productsService.checkProductsAvailability(orderDto.lineItems).pipe(
      switchMap(resp =>
        iif(
          () => resp,
          createOrder$,
          throwError(() => new HttpException('Not enough products!', HttpStatus.FORBIDDEN))
        )
      )
    );
  }
}
