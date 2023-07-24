import { createReducer, on } from '@ngrx/store';
import { CartItem } from '@shop-project/microservices/cart/types';
import { CartActions } from './cart.actions';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer<CartState>(
  initialState,
  on(CartActions.init, state => {
    return {
      ...state,
      items: [],
    };
  }),
  on(CartActions.cartLoadedSuccess, (state, action) => {
    return {
      ...state,
      items: action.items,
    };
  }),
  on(CartActions.productAddedSuccess, (state, action) => {
    return {
      ...state,
      items: action.items,
    };
  })
);
