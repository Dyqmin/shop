import {Route} from "@angular/router";
import {ProductsListComponent} from "@shop-project/shop/client/products/feature-products";

export const productsShellRoutes = [
  {
    path: '',
    component: ProductsListComponent,
  },
  // {
  //   path: ':id',
  // }
] as Route[];
