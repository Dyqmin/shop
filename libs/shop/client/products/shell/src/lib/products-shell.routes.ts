import { Route } from '@angular/router';
import { ProductsListComponent } from '@shop-project/shop/client/products/feature-products';
import {
  injectProductsFeature,
  loadProducts$,
  productsFeature,
  ProductsService,
} from '@shop-project/shop/client/products/data-access';
import { CartService } from '@shop-project/shop/client/cart/data-access';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const productsShellRoutes = [
  {
    path: '',
    component: ProductsListComponent,
    resolve: [
      () => {
        const productsFeature = injectProductsFeature();

        return productsFeature.init();
      },
    ],
    providers: [
      ProductsService,
      provideState(productsFeature),
      provideEffects({ loadProducts$ }),
    ],
  },
  // {
  //   path: ':id',
  // }
] as Route[];
