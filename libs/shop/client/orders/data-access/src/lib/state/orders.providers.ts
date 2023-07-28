import { makeEnvironmentProviders } from "@angular/core";
import { provideState } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { loadOrders$, ordersFeature } from "./orders";
import { loadOrder$, orderDetailsFeature } from "./order-details";

export const provideOrdersState = () => makeEnvironmentProviders([
  provideState(ordersFeature),
  provideState(orderDetailsFeature),
  provideEffects({ loadOrders$, loadOrder$ }),
]);
