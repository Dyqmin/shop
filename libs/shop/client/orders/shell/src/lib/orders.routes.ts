import { ResolveFn, Route } from '@angular/router';
import { employeeGuard } from '@shop-project/shop/client/auth/data-access';
import {
  injectOrderDetailsFeature,
  injectOrdersFeature,
  OrdersService,
  provideOrdersState,
} from '@shop-project/shop/client/orders/data-access';

export const resolveOrders: ResolveFn<void> = () => {
  const ordersFeature = injectOrdersFeature();
  ordersFeature.init();
};
export const resolveOrder: ResolveFn<void> = route => {
  const ordersFeature = injectOrderDetailsFeature();
  ordersFeature.init(+route.paramMap.get('orderId')!);
};

export const ordersRoutes = [
  {
    path: '',
    providers: [OrdersService, provideOrdersState()],
    children: [
      {
        path: '',
        resolve: [resolveOrders],
        pathMatch: 'full',
        loadComponent: () =>
          import('@shop-project/shop/client/orders/feature-orders').then(
            m => m.OrdersListComponent
          ),
      },
      {
        path: 'create-order',
        loadComponent: () =>
          import('@shop-project/shop/client/orders/feature-create-order').then(
            m => m.CreateOrderComponent
          ),
      },
      {
        resolve: [resolveOrders],
        canActivate: [employeeGuard],
        path: 'manage',
        loadComponent: () =>
          import('@shop-project/shop/client/orders/feature-orders-management').then(
            m => m.OrdersManagementComponent
          ),
      },
      {
        resolve: [resolveOrder],
        path: ':orderId',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@shop-project/shop/client/orders/feature-order-details').then(
                m => m.OrderDetailsComponent
              ),
          },
          {
            path: 'edit',
            canActivate: [employeeGuard],
            loadComponent: () =>
              import('@shop-project/shop/client/orders/feature-edit-order').then(
                m => m.EditOrderComponent
              ),
          },
        ],
      },
    ],
  },
] as Route[];
