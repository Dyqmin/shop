import { makeEnvironmentProviders } from "@angular/core";
import { provideState } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { createOrder$, createOrderSuccess$, loadOrders$, ordersFeature } from "./orders";
import { editOrderStatus$, loadOrder$, orderDetailsFeature } from "./order-details";

export const provideOrdersState = () => makeEnvironmentProviders([
  provideState(ordersFeature),
  provideState(orderDetailsFeature),
  provideEffects({ loadOrders$, loadOrder$, createOrder$, createOrderSuccess$, editOrderStatus$ }),
]);
