import {Route} from "@angular/router";
import {ProductsListComponent} from "@shop-project/shop/client/products/feature-products";
import {ProductsService} from "@shop-project/shop/client/products/data-access";
import { CartService } from "@shop-project/shop/client/cart/data-access";

export const productsShellRoutes = [
  {
    path: '',
    component: ProductsListComponent,
    providers: [ProductsService, CartService],
  },
  // {
  //   path: ':id',
  // }
] as Route[];
