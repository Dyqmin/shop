import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  loadProduct$,
  loadProducts$,
  productDetailsFeature,
  productsFeature,
  ProductsService,
} from '@shop-project/shop/client/products/data-access';
import { ProductDetailsComponent } from '@shop-project/shop/client/products/feature-product-details';
import { ProductsListComponent } from '@shop-project/shop/client/products/feature-products';
import { productDetailResolver, resolveProducts } from './products.resolver';

export const productsShellRoutes = [
  {
    path: '',
    providers: [
      ProductsService,
      provideState(productsFeature),
      provideState(productDetailsFeature),
      provideEffects({ loadProducts$, loadProduct$ }),
    ],
    children: [
      {
        path: '',
        component: ProductsListComponent,
        resolve: [resolveProducts],
      },
      {
        path: ':productId',
        component: ProductDetailsComponent,
        resolve: [productDetailResolver],
      },
    ],
  },
] as Route[];
