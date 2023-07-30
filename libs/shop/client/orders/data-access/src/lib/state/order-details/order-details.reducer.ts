import { createReducer, on } from '@ngrx/store';
import { OrderView } from "@shop-project/microservices/orders/types";
import { OrderDetailsActions } from "./order-details.actions";

export interface OrderDetailsState {
  order: OrderView | null;
}

const initialState: OrderDetailsState = {
  order: null,
};

export const orderDetailsReducer = createReducer<OrderDetailsState>(
  initialState,
  on(OrderDetailsActions.init, (state, action) => {
    return {
      ...state,
      order: null,
    };
  }),
  on(OrderDetailsActions.orderDetailsLoadedSuccess, (state, action) => {
    return {
      ...state,
      order: action.order,
    };
  }),
);
