import { createReducer, on } from '@ngrx/store';
import { Order } from "@shop-project/microservices/orders/types";
import { OrdersActions } from "./orders.actions";

export interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export const ordersReducer = createReducer<OrdersState>(
  initialState,
  on(OrdersActions.init, (state, action) => {
    return {
      ...state,
      orders: [],
    };
  }),
  on(OrdersActions.ordersLoadedSuccess, (state, action) => {
    return {
      ...state,
      orders: action.orders,
    };
  }),
);
