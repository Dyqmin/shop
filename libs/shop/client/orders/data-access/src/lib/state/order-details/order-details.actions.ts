import { createActionGroup, props } from "@ngrx/store";
import { OrderView } from "@shop-project/microservices/orders/types";

export const OrderDetailsActions = createActionGroup({
  source: 'Order Details',
  events: {
    init: props<{ id: number }>(),
    'Order Details Loaded Success': props<{ order: OrderView }>(),
    'Order Details Loaded Failure': props<{ error: string }>(),
  }
});
