import { createReducer, on } from '@ngrx/store';
import { Product } from '@shop-project/microservices/catalog/types';
import { ProductDetailsActions } from './product-details.actions';

export interface ProductState {
  product: Product | null;
}

const initialState: ProductState = {
  product: null,
};

export const productDetailsReducer = createReducer(
  initialState,
  on(ProductDetailsActions.fetchCurrentProduct, (state, action) => {
    return {
      ...state,
      product: null,
    };
  }),
  on(
    ProductDetailsActions.fetchSingleProductSuccess,
    (state, action) => {
      return {
        ...state,
        product: action.product,
      };
    }
  )
);
