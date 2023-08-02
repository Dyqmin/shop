import { inject } from '@angular/core';
import { createFeature, createSelector, Store } from '@ngrx/store';
import { NewProduct } from '@shop-project/microservices/catalog/types';
import { ProductsPageActions } from './products.actions';
import { productsReducer } from './products.reducer';

export const productsFeature = createFeature({
  name: 'products',
  reducer: productsReducer,
  extraSelectors: ({ selectProducts, selectCurrentId }) => ({
    selectCurrentProduct: createSelector(selectProducts, selectCurrentId, (products, id) =>
      products.find(product => product.id === id)
    ),
  }),
});

export const { selectProducts, selectCurrentProduct } = productsFeature;

export const injectProductsFeature = () => {
  const _store = inject(Store);

  return {
    products: _store.selectSignal(selectProducts),
    currentProduct: _store.selectSignal(selectCurrentProduct),
    createProduct: (newProduct: NewProduct) =>
      _store.dispatch(ProductsPageActions.createProduct({ newProduct })),
    editProduct: (newProduct: NewProduct) =>
      _store.dispatch(ProductsPageActions.editProduct({ newProduct })),
    init: () => _store.dispatch(ProductsPageActions.init()),
    setCurrentId: (id: number) => _store.dispatch(ProductsPageActions.productSelected({ id })),
  };
};
