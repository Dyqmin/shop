import { createReducer, on } from '@ngrx/store';
import { ProductsPageActions } from './products.actions';
import { Product } from '@shop-project/microservices/catalog/types';

export interface ProductsState {
  products: Product[];
  currentId: number | null;
}

const initialState: ProductsState = {
  products: [],
  currentId: null,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.enter, (state, action) => {
    return {
      ...state,
      products: [],
    };
  }),
  on(ProductsPageActions.productsLoadedSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
    };
  }),
  on(ProductsPageActions.productSelected, (state, action) => {
    return {
      ...state,
      currentId: action.id,
    };
  })
);
