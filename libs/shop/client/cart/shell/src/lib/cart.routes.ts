import {Route} from "@angular/router";
import { CartService } from "@shop-project/shop/client/cart/data-access";
import { CartComponent } from "@shop-project/shop/client/cart/feature-cart";

export const cartShellRoutes = [
  {
    path: '',
    component: CartComponent,
    providers: [CartService],
  },
  // {
  //   path: ':id',
  // }
] as Route[];
