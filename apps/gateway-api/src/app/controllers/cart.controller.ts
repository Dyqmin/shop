import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';

import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { CartItem } from "@shop-project/microservices/cart/types";
import { Auth0Guard, User } from "@shop-project/api/auth";

@Controller('cart')
@ApiTags('cart')
export class CartController {
  constructor(@Inject('CART_SERVICE') private readonly c: ClientProxy) {}

  @Get()
  @UseGuards(Auth0Guard)
  getCart(@User() user: User) {
    return this.c.send({ cmd: 'getCart' }, { id: user.sub });
  }

  @Post()
  @UseGuards(Auth0Guard)
  setCart(@Body() cartItem: CartItem, @User() user: User) {
    return this.c.send({ cmd: 'addOrModifyCartItem' }, {
      userId: user.sub,
      productId: cartItem.product.id,
      product: JSON.stringify(cartItem.product),
      quantity: cartItem.quantity,
    });
  }

  @Delete(':id')
  @UseGuards(Auth0Guard)
  removeItem(@Param('id') id: string, @User() user: User) {
    return this.c.send({ cmd: 'removeCartItem' }, {
      userId: user.sub,
      productId: id,
    });
  }
}
