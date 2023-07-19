import {Route} from "@angular/router";
import {ProductsListComponent} from "@shop-project/shop/client/products/feature-products";
import {ProductsService} from "@shop-project/shop/client/products/data-access";

export const productsShellRoutes = [
  {
    path: '',
    component: ProductsListComponent,
    providers: [ProductsService],
  },
  // {
  //   path: ':id',
  // }
] as Route[];
