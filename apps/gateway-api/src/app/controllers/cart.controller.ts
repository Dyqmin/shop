import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ApiTags } from "@nestjs/swagger";
import { CartItem } from "@shop-project/microservices/cart/types";
import { Auth0Guard, User } from "@shop-project/api/auth";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

@Controller('cart')
@ApiTags('cart')
export class CartController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get()
  @UseGuards(Auth0Guard)
  getCart(@User() user: User) {
    return this.amqpConnection.request({
      exchange: 'event-exchange',
      routingKey: 'get-cart',
      payload: { id: user.sub }
    });
  }

  @Post()
  @UseGuards(Auth0Guard)
  setCart(@Body() cartItem: CartItem, @User() user: User) {
    return this.amqpConnection.request({
      exchange: 'event-exchange',
      routingKey: 'add-or-modify-cart-item',
      payload: {
        userId: user.sub,
        productId: cartItem.product.id,
        product: JSON.stringify(cartItem.product),
        quantity: cartItem.quantity,
      }
    });
  }

  @Delete(':id')
  @UseGuards(Auth0Guard)
  removeItem(@Param('id') id: string, @User() user: User) {
    return this.amqpConnection.request({
      exchange: 'event-exchange',
      routingKey: 'remove-cart-item',
      payload: {
        userId: user.sub,
        productId: id,
      }
    });
  }
}
