import { inject } from '@angular/core';
import { createFeature, createSelector, Store } from '@ngrx/store';
import { cartReducer } from './cart.reducer';
import { CartActions } from './cart.actions';
import { CartItem } from '@shop-project/microservices/cart/types';

export const cartFeature = createFeature({
  name: 'cart',
  reducer: cartReducer,
  extraSelectors: ({ selectItems }) => ({
    getFullPrice: createSelector(selectItems, items =>
      items.reduce(
        (acc, cartItem) =>
          acc + +(cartItem.product.price || 0) * cartItem.quantity,
        0
      )
    ),
  }),
});

export const { selectItems, getFullPrice } = cartFeature;

export const injectCartFeature = () => {
  const _store = inject(Store);

  return {
    cartItems: _store.selectSignal(selectItems),
    fullPrice: _store.selectSignal(getFullPrice),
    addToCart: (cartItem: CartItem) =>
      _store.dispatch(CartActions.addProduct({ cartItem })),
    removeFromCart: (cartItem: CartItem) =>
      _store.dispatch(CartActions.removeProduct({ cartItem })),
    init: () => _store.dispatch(CartActions.init()),
  };
};
