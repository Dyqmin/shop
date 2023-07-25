import { inject } from '@angular/core';
import { createFeature, Store } from '@ngrx/store';
import { productDetailsReducer } from "./product-details.reducer";
import { ProductDetailsActions } from "./product-details.actions";

export const productDetailsFeature = createFeature({
  name: 'productDetails',
  reducer: productDetailsReducer,
});

export const { selectProduct } = productDetailsFeature;

export const injectProductDetailsFeature = () => {
  const _store = inject(Store);

  return {
    product: _store.selectSignal(selectProduct),
    fetchProduct: (id: number) => _store.dispatch(ProductDetailsActions.fetchCurrentProduct({ id })),
  };
};
