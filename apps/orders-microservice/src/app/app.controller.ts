import { NewCustomer, NewLineItem, NewOrder, NewShipment } from '@shop-project/microservices/orders/types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'insertOrder' })
  insertOrder(@Payload() data: { order: NewOrder }) {
    return this.appService.insertOrder(data.order);
  }

  @MessagePattern({ cmd: 'insertLineItems' })
  insertLineItems(@Payload() data: { lineItems: NewLineItem[] }) {
    return this.appService.insertLineItems(data.lineItems);
  }

  @MessagePattern({ cmd: 'insertCustomer' })
  insertCustomer(@Payload() data: { newCustomer: NewCustomer }) {
    return this.appService.insertCustomer(data.newCustomer);
  }

  @MessagePattern({ cmd: 'insertShipment' })
  insertShipment(@Payload() data: { newShipment: NewShipment }) {
    return this.appService.insertShipment(data.newShipment);
  }

  @MessagePattern({ cmd: 'getOrder' })
  getOrder(@Payload() data: { id: number }) {
    return this.appService.getOrder(data.id);
  }

  @MessagePattern({ cmd: 'getOrders' })
  getOrders(@Payload() data: { userId: string }) {
    return this.appService.getOrders(data.userId);
  }
}
