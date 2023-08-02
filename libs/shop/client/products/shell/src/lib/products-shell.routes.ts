import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { employeeGuard } from '@shop-project/shop/client/auth/data-access';
import {
  createProduct$,
  loadProduct$,
  loadProducts$,
  productDetailsFeature,
  productsFeature,
  ProductsService,
} from '@shop-project/shop/client/products/data-access';
import { CreateProductComponent } from '@shop-project/shop/client/products/feature-create-product';
import { ProductDetailsComponent } from '@shop-project/shop/client/products/feature-product-details';
import { ProductsListComponent } from '@shop-project/shop/client/products/feature-products';
import { productDetailResolver, resolveProducts } from './products.resolver';

export const productsShellRoutes = [
  {
    path: '',
    providers: [
      ProductsService,
      provideState(productsFeature),
      provideState(productDetailsFeature),
      provideEffects({ loadProducts$, loadProduct$, createProduct$ }),
    ],
    children: [
      {
        path: '',
        component: ProductsListComponent,
        resolve: [resolveProducts],
      },
      {
        path: 'create',
        component: CreateProductComponent,
        canActivate: [employeeGuard],
      },
      {
        path: ':productId',
        component: ProductDetailsComponent,
        resolve: [productDetailResolver],
      },
    ],
  },
] as Route[];
