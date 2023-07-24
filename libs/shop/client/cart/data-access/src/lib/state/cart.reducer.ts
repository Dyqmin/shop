import { createReducer, on } from '@ngrx/store';
import { CartItem } from '@shop-project/microservices/cart/types';
import { CartActions } from './cart.actions';

export interface CartState {
  items: CartItem[];
  itemsFetching: boolean;
}

const initialState: CartState = {
  items: [],
  itemsFetching: true,
};

export const cartReducer = createReducer<CartState>(
  initialState,
  on(CartActions.init, state => {
    return {
      ...state,
      items: [],
      itemsFetching: true,
    };
  }),
  on(CartActions.cartLoadedSuccess, (state, action) => {
    return {
      ...state,
      items: action.items,
      itemsFetching: false,
    };
  }),
  on(CartActions.addProduct, (state, action) => {
    return {
      ...state,
      itemsFetching: true,
    };
  }),
  on(CartActions.productAddedSuccess, (state, action) => {
    return {
      ...state,
      items: action.items,
      itemsFetching: false,
    };
  }),

  on(CartActions.removeProduct, (state, action) => {
    return {
      ...state,
      itemsFetching: true,
    };
  }),
  on(CartActions.removeProductSuccess, (state, action) => {
    return {
      ...state,
      items: action.items,
      itemsFetching: false,
    };
  }),
  on(CartActions.modifyItem, (state, action) => {
    return {
      ...state,
      itemsFetching: true,
    };
  }),
  on(CartActions.modifyItemSuccess, (state, action) => {
    return {
      ...state,
      items: action.items,
      itemsFetching: false,
    };
  }),
);
