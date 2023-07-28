import { Route } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core';
import {
  cartFeature,
  CartService,
  injectCartFeature,
  provideCartEffects,
} from '@shop-project/shop/client/cart/data-access';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  loadProduct$,
  loadProducts$, productDetailsFeature,
  productsFeature,
  ProductsService,
} from '@shop-project/shop/client/products/data-access';

export const shellRoutes = [
  {
    path: 'products',
    loadChildren: () =>
      import('@shop-project/shop/client/products/shell').then(
        s => s.productsShellRoutes
      ),
    canActivate: [AuthGuard],
    providers: [
      ProductsService,
      provideState(productsFeature),
      provideState(productDetailsFeature),
      provideEffects({ loadProducts$, loadProduct$ }),
    ],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('@shop-project/shop/client/cart/shell').then(
        s => s.cartShellRoutes
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('@shop-project/shop/client/orders/shell').then(
        s => s.ordersRoutes
      ),
    canActivate: [AuthGuard],
  },
] as Route[];

export const provideShell = () =>
  makeEnvironmentProviders([
    CartService,

    provideState(cartFeature),
    provideCartEffects(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const cartFeature = injectCartFeature();

        return () => {
          cartFeature.init();
        };
      },
    },
  ]);
