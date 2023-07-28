import { ResolveFn, Route } from "@angular/router";
import {
  injectOrderDetailsFeature,
  injectOrdersFeature,
  OrdersService,
  provideOrdersState
} from "@shop-project/shop/client/orders/data-access";

export const resolveOrders: ResolveFn<void> = () => {
  const ordersFeature = injectOrdersFeature();
  ordersFeature.init();
};
export const resolveOrder: ResolveFn<void> = (route) => {
  const ordersFeature = injectOrderDetailsFeature();
  ordersFeature.init(+route.paramMap.get('orderId')!);
};

export const ordersRoutes = [
  {
    path: '',
    providers: [
      OrdersService,
      provideOrdersState(),
    ],
    children: [
      {
        path: '',
        resolve: [
          resolveOrders
        ],
        loadComponent: () => import('@shop-project/shop/client/orders/feature-orders').then(m => m.OrdersListComponent),
      },
      {
        resolve: [
          resolveOrder
        ],
        path: ':orderId',
        loadComponent: () => import('@shop-project/shop/client/orders/feature-order-details').then(m => m.OrderDetailsComponent),
      },
      {
        path: 'create-order',
        loadComponent: () => import('@shop-project/shop/client/orders/feature-create-order').then(m => m.CreateOrderComponent),
      }
    ],
  },
] as Route[];
