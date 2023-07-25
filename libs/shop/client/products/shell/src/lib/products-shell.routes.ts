import { Route } from '@angular/router';
import { ProductsListComponent } from '@shop-project/shop/client/products/feature-products';
import { ProductDetailsComponent } from "@shop-project/shop/client/products/feature-product-details";
import { productDetailResolver, resolveProducts } from "./products.resolver";

export const productsShellRoutes = [
  {
    path: '',
    component: ProductsListComponent,
    resolve: [resolveProducts],
  },
  {
    path: ':productId',
    component: ProductDetailsComponent,
    resolve: [productDetailResolver]
  }
] as Route[];
