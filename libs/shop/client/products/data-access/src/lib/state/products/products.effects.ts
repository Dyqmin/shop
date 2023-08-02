import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { exhaustMap, map, tap } from 'rxjs';
import { ProductsService } from '../../products.service';
import { ProductsPageActions } from './products.actions';

export const loadProducts$ = createEffect(
  (actions$ = inject(Actions)) => {
    const productsService = inject(ProductsService);

    return actions$.pipe(
      ofType(ProductsPageActions.init),
      exhaustMap(() =>
        productsService
          .getProducts()
          .pipe(map(products => ProductsPageActions.productsLoadedSuccess({ products })))
      )
    );
  },
  { functional: true }
);

export const createProduct$ = createEffect(
  (actions$ = inject(Actions)) => {
    const productsService = inject(ProductsService);
    const toastrService = inject(ToastrService);

    return actions$.pipe(
      ofType(ProductsPageActions.createProduct),
      exhaustMap(({ newProduct }) =>
        productsService.insertProduct(newProduct).pipe(
          map(product => ProductsPageActions.createProductSuccess({ product })),
          tap(() => {
            toastrService.success('Pomyślnie utworzono produkt!');
          })
        )
      )
    );
  },
  { functional: true }
);

export const editProduct$ = createEffect(
  (actions$ = inject(Actions)) => {
    const productsService = inject(ProductsService);
    const toastrService = inject(ToastrService);

    return actions$.pipe(
      ofType(ProductsPageActions.editProduct),
      exhaustMap(({ newProduct }) =>
        productsService.editProduct(newProduct).pipe(
          map(product => ProductsPageActions.editProductSuccess({ product })),
          tap(() => {
            toastrService.success('Pomyślnie zmodyfikowano produkt!');
          })
        )
      )
    );
  },
  { functional: true }
);
