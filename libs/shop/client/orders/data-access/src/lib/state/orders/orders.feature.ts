import { inject } from '@angular/core';
import { createFeature, Store } from '@ngrx/store';
import { ordersReducer } from "./orders.reducer";
import { OrdersActions } from "./orders.actions";

export const ordersFeature = createFeature({
  name: 'orders',
  reducer: ordersReducer,
});

export const { selectOrders } = ordersFeature;

export const injectOrdersFeature = () => {
  const _store = inject(Store);

  return {
    orders: _store.selectSignal(selectOrders),
    init: () => _store.dispatch(OrdersActions.init()),
  };
};
