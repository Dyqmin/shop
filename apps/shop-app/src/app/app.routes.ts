import { Route } from '@angular/router';
import {HomeComponent} from "./home.component";

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    loadChildren: () => import('@shop-project/shop/client/products/shell').then((s) => s.productsShellRoutes)
  }
];
