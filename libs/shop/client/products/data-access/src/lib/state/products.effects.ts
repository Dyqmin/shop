import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ProductsPageActions } from './products.actions';
import { ProductsService } from '../products.service';
import { exhaustMap, map } from 'rxjs';

export const loadProducts$ = createEffect((actions$ = inject(Actions)) => {
  const productsService = inject(ProductsService);

  return actions$.pipe(
    ofType(ProductsPageActions.enter),
    exhaustMap(() =>
      productsService
        .getProducts()
        .pipe(
          map(products =>
            ProductsPageActions.productsLoadedSuccess({ products })
          )
        )
    )
  );
}, { functional: true });
