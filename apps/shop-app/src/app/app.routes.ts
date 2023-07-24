import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import {
  AuthButtonComponent,
  ErrorComponent,
} from '@shop-project/shop/client/ui';
import { shellRoutes } from "@shop-project/shop/client/shell";

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
    path: 'error',
    component: ErrorComponent,
  },
  ...shellRoutes,
];
