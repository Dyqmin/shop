import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { OrderStatus, OrderView, PaymentStatus } from '@shop-project/microservices/orders/types';

export const OrderDetailsActions = createActionGroup({
  source: 'Order Details',
  events: {
    init: props<{ id: number }>(),
    'Order Details Loaded Success': props<{ order: OrderView }>(),
    'Order Details Loaded Failure': props<{ error: string }>(),
    'Edit Order Status': props<{
      orderId: number;
      paymentStatus?: PaymentStatus;
      status?: OrderStatus;
    }>(),
    'Edit Order Status Success': emptyProps(),
    'Edit Order Status Failure': props<{ error: string }>(),
  },
});
