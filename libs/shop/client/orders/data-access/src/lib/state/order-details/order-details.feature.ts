import { inject } from '@angular/core';
import { createFeature, Store } from '@ngrx/store';
import { orderDetailsReducer } from "./order-details.reducer";
import { OrderDetailsActions } from "./order-details.actions";
import { Order } from "@shop-project/microservices/orders/types";

export const orderDetailsFeature = createFeature({
  name: 'orderDetails',
  reducer: orderDetailsReducer,
});

export const { selectOrder } = orderDetailsFeature;

export const injectOrderDetailsFeature = () => {
  const _store = inject(Store);

  return {
    order: _store.selectSignal(selectOrder),
    edit: (orderId: number, order: Partial<Order>) => _store.dispatch(OrderDetailsActions.editOrderStatus({ orderId, ...order })),
    init: (id: number) => _store.dispatch(OrderDetailsActions.init({ id })),
  };
};
