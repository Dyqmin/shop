import { createActionGroup, props } from "@ngrx/store";
import { OrderWithLineItem } from "@shop-project/microservices/orders/types";

export const OrderDetailsActions = createActionGroup({
  source: 'Order Details',
  events: {
    init: props<{ id: number }>(),
    'Order Details Loaded Success': props<{ order: OrderWithLineItem }>(),
    'Order Details Loaded Failure': props<{ error: string }>(),
  }
});
