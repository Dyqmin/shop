import { inject } from '@angular/core';
import { createFeature, Store } from '@ngrx/store';
import { cartReducer } from './cart.reducer';
import { CartActions } from './cart.actions';
import { CartItem } from '@shop-project/microservices/cart/types';

export const cartFeature = createFeature({
  name: 'cart',
  reducer: cartReducer,
});

export const { selectItems } = cartFeature;

export const injectCartFeature = () => {
  const _store = inject(Store);

  return {
    cartItems: _store.selectSignal(selectItems),
    addToCart: (cartItem: CartItem) =>
      _store.dispatch(CartActions.addProduct({ cartItem })),
    init: () => _store.dispatch(CartActions.init()),
  };
};
