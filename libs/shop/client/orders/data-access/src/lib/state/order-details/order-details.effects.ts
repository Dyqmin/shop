import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { OrderDetailsActions } from "./order-details.actions";

export const loadOrder$ = createEffect(
  (actions$ = inject(Actions)) => {
    const ordersService = inject(OrdersService);

    return actions$.pipe(
      ofType(OrderDetailsActions.init),
      exhaustMap(({ id }) =>
        ordersService.getOrder(id).pipe(map(order => OrderDetailsActions.orderDetailsLoadedSuccess({ order })))
      )
    );
  },
  { functional: true }
);
