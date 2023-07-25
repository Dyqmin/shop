import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { exhaustMap, map } from "rxjs";
import { ProductsService } from "../../products.service";
import { ProductDetailsActions } from "./product-details.actions";


export const loadProduct$ = createEffect((actions$ = inject(Actions)) => {
  const productsService = inject(ProductsService);

  return actions$.pipe(
    ofType(ProductDetailsActions.fetchCurrentProduct),
    exhaustMap(({ id }) =>
      productsService
        .getProduct(id)
        .pipe(
          map((product) =>
            ProductDetailsActions.fetchSingleProductSuccess({ product })
          )
        )
    )
  );
}, { functional: true });
