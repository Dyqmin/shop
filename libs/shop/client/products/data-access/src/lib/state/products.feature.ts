import { inject } from '@angular/core';
import { createFeature, createSelector, Store } from '@ngrx/store';
import { ProductsPageActions } from './products.actions';
import { selectProducts } from './products.selectors';
import { productsReducer } from './products.reducer';

export const productsFeature = createFeature({
  name: 'products',
  reducer: productsReducer,
  extraSelectors: ({ selectProducts, selectCurrentId }) => ({
    selectCurrentProduct: createSelector(
      selectProducts,
      selectCurrentId,
      (products, id) => products.find(product => product.id === id)
    ),
  }),
});

export const injectProductsFeature = () => {
  const _store = inject(Store);

  return {
    products: _store.selectSignal(selectProducts),
    enter: () => _store.dispatch(ProductsPageActions.enter()),
  };
};
