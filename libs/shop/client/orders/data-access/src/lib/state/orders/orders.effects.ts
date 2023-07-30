import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { OrdersActions } from './orders.actions';
import { CartActions } from "@shop-project/shop/client/cart/data-access";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

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

export const createOrder$ = createEffect(
  (actions$ = inject(Actions)) => {
    const ordersService = inject(OrdersService);

    return actions$.pipe(
      ofType(OrdersActions.createOrder),
      exhaustMap(({ newOrder }) =>
        ordersService.createOrder(newOrder).pipe(map((order) => OrdersActions.createOrderSuccess({ order })))
      )
    );
  },
  { functional: true }
);

export const createOrderSuccess$ = createEffect(
  (actions$ = inject(Actions)) => {
    const router = inject(Router);
    const toastService = inject(ToastrService);

    return actions$.pipe(
      ofType(OrdersActions.createOrderSuccess),
      tap(({ order }) => router.navigateByUrl(`/orders/${order.id}`)),
      map(() => CartActions.refreshCart()),
      tap(() => toastService.success('Zamówienie utworzone!'))
    );
  },
  { functional: true }
);
