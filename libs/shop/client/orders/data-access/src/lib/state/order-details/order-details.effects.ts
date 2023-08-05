import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, tap } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { OrderDetailsActions } from "./order-details.actions";
import { ToastrService } from "ngx-toastr";

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

export const editOrderStatus$ = createEffect(
  (actions$ = inject(Actions)) => {
    const ordersService = inject(OrdersService);
    const toastrService = inject(ToastrService);

    return actions$.pipe(
      ofType(OrderDetailsActions.editOrderStatus),
      exhaustMap(({ orderId, status, paymentStatus }) =>
        ordersService.editOrder(orderId, { status, paymentStatus }).pipe(map(() => OrderDetailsActions.editOrderStatusSuccess()))
      ),
      tap(() => {
        toastrService.success('Pomyślnie zmodyfikowano zamówienie!')
      }),
      catchError((err) => {
        toastrService.error('Błąd podczas modyfikacji zamówienia!')
        return EMPTY;
      })
    );
  },
  { functional: true }
);
