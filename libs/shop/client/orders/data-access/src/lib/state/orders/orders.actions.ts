import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Order } from "@shop-project/microservices/orders/types";

export const OrdersActions = createActionGroup({
  source: 'Orders',
  events: {
    init: emptyProps(),
    'Orders Loaded Success': props<{ orders: Order[] }>(),
    'Orders Loaded Failure': props<{ error: string }>(),
  }
});
