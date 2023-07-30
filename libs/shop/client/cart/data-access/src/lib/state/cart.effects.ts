import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';
import { inject, makeEnvironmentProviders } from '@angular/core';
import { exhaustMap, map, tap } from 'rxjs';
import { CartActions } from './cart.actions';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

export const loadCart$ = createEffect(
  (actions$ = inject(Actions)) => {
    const cartService = inject(CartService);

    return actions$.pipe(
      ofType(CartActions.init, CartActions.refreshCart),
      exhaustMap(() =>
        cartService
          .getCart()
          .pipe(map(cartItems => CartActions.cartLoadedSuccess({ items: cartItems })))
      )
    );
  },
  { functional: true }
);

export const addToCart$ = createEffect(
  (actions$ = inject(Actions)) => {
    const cartService = inject(CartService);
    const toastService = inject(ToastrService);

    return actions$.pipe(
      ofType(CartActions.addProduct),
      exhaustMap(({ cartItem }) =>
        cartService.addOrRemoveItem(cartItem).pipe(
          map(cartItems => CartActions.productAddedSuccess({ items: cartItems })),
          tap(() => {
            toastService.success('Produkt dodano do koszyka!');
          })
        )
      )
    );
  },
  { functional: true }
);

export const modifyCartItem$ = createEffect(
  (actions$ = inject(Actions)) => {
    const cartService = inject(CartService);
    const toastService = inject(ToastrService);

    return actions$.pipe(
      ofType(CartActions.modifyItem),
      exhaustMap(({ cartItem }) =>
        cartService.addOrRemoveItem(cartItem).pipe(
          map(cartItems => CartActions.modifyItemSuccess({ items: cartItems })),
          tap(() => {
            toastService.success('Zmodyfikowano koszyk!');
          })
        )
      )
    );
  },
  { functional: true }
);

export const removeFromCart$ = createEffect(
  (actions$ = inject(Actions)) => {
    const cartService = inject(CartService);
    const toastService = inject(ToastrService);

    return actions$.pipe(
      ofType(CartActions.removeProduct),
      exhaustMap(({ cartItem }) =>
        cartService.removeItem(cartItem).pipe(
          map(cartItems => CartActions.removeProductSuccess({ items: cartItems })),
          tap(() => {
            toastService.success('Produkt usunięty z koszyka!');
          })
        )
      )
    );
  },
  { functional: true }
);

export const provideCartEffects = () =>
  makeEnvironmentProviders([
    provideEffects({ loadCart$, addToCart$, removeFromCart$, modifyCartItem$ }),
  ]);
