import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { OrdersActions } from './orders.actions';

export const loadOrders$ = createEffect(
  (actions$ = inject(Actions)) => {
    const ordersService = inject(OrdersService);

    return actions$.pipe(
      ofType(OrdersActions.init),
      exhaustMap(() =>
        ordersService.getOrders().pipe(map(orders => OrdersActions.ordersLoadedSuccess({ orders })))
      )
    );
  },
  { functional: true }
);
