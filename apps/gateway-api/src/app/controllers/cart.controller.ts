import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';

import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { CartItem } from "@shop-project/microservices/cart/types";

@Controller('cart')
@ApiTags('cart')
export class CartController {
  constructor(@Inject('CART_SERVICE') private readonly c: ClientProxy) {}

  @Get()
  getCart() {
    return this.c.send({ cmd: 'getCart' }, { id: '123' });
  }

  @Post()
  setCart(@Body() cartItem: CartItem) {
    console.log(cartItem);
    return this.c.send({ cmd: 'setCart' }, {
      userId: '123',
      productId: cartItem.product.id,
      product: JSON.stringify(cartItem.product),
      quantity: cartItem.quantity,
      items: {
        1: 1,
        2: 2,
        [Math.random()]: { asd: 'asd' },
      }
    });
  }

  @Delete(':id')
  removeItem(@Param('id') id: string) {
    return this.c.send({ cmd: 'removeItemFromCart' }, {
      userId: '123',
      productId: id,
    });
  }
}
