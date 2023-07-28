import { inject } from '@angular/core';
import { createFeature, Store } from '@ngrx/store';
import { orderDetailsReducer } from "./order-details.reducer";
import { OrderDetailsActions } from "./order-details.actions";

export const orderDetailsFeature = createFeature({
  name: 'orderDetails',
  reducer: orderDetailsReducer,
});

export const { selectOrder } = orderDetailsFeature;

export const injectOrderDetailsFeature = () => {
  const _store = inject(Store);

  return {
    order: _store.selectSignal(selectOrder),
    init: (id: number) => _store.dispatch(OrderDetailsActions.init({ id })),
  };
};
