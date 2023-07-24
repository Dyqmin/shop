import { Route } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core';
import {
  addToCart$,
  cartFeature,
  CartService,
  injectCartFeature,
  loadCart$, modifyCartItem$, provideCartEffects, removeFromCart$,
} from '@shop-project/shop/client/cart/data-access';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const shellRoutes = [
  {
    path: 'products',
    loadChildren: () =>
      import('@shop-project/shop/client/products/shell').then(
        s => s.productsShellRoutes
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('@shop-project/shop/client/cart/shell').then(
        s => s.cartShellRoutes
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
