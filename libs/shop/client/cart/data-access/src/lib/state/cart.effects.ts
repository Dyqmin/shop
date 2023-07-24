import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { exhaustMap, map } from 'rxjs';
import { CartActions } from './cart.actions';
import { CartService } from '../cart.service';

export const loadCart$ = createEffect(
  (actions$ = inject(Actions)) => {
    const cartService = inject(CartService);

    return actions$.pipe(
      ofType(CartActions.init),
      exhaustMap(() =>
        cartService
          .getCart()
          .pipe(
            map(cartItems =>
              CartActions.cartLoadedSuccess({ items: cartItems })
            )
          )
      )
    );
  },
  { functional: true }
);

export const addToCart$ = createEffect(
  (actions$ = inject(Actions)) => {
    const cartService = inject(CartService);

    return actions$.pipe(
      ofType(CartActions.addProduct),
      exhaustMap(({ cartItem }) =>
        cartService
          .addItem(cartItem)
          .pipe(
            map(cartItems =>
              CartActions.productAddedSuccess({ items: cartItems })
            )
          )
      )
    );
  },
  { functional: true }
);

export const removeFromCart$ = createEffect(
  (actions$ = inject(Actions)) => {
    const cartService = inject(CartService);

    return actions$.pipe(
      ofType(CartActions.removeProduct),
      exhaustMap(({ cartItem }) =>
        cartService
          .removeItem(cartItem)
          .pipe(
            map(cartItems =>
              CartActions.removeProductSuccess({ items: cartItems })
            )
          )
      )
    );
  },
  { functional: true }
);
