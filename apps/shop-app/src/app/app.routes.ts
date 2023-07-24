import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import {
  AuthButtonComponent,
  ErrorComponent,
} from '@shop-project/shop/client/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AuthButtonComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
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
  {
    path: 'error',
    component: ErrorComponent,
  },
];
