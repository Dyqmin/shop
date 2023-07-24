import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'getCart' })
  getCart(@Payload() data: { id: string }, @Ctx() context: RmqContext) {
    return this.appService.getCart(data.id);
  }

  @MessagePattern({ cmd: 'setCart' })
  setCart(
    @Payload() data: { userId: string; productId: number; product: string; quantity: number; items: Record<string, number> },
    @Ctx() context: RmqContext
  ) {
    return this.appService.setCart(data.userId, {
      [data.productId]: JSON.stringify({
        product: data.product,
        quantity: data.quantity,
      })
    });
  }

  @MessagePattern({ cmd: 'removeItemFromCart' })
  removeItemFromCart(
    @Payload() data: { userId: string; productId: string; },
    @Ctx() context: RmqContext
  ) {
    return this.appService.removeItem(data.userId, data.productId);
  }
}
