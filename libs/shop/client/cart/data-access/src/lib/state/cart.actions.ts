import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '@shop-project/microservices/cart/types';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    init: emptyProps(),
    'Cart Loaded Success': props<{ items: CartItem[] }>(),
    'Cart Loaded Failure': props<{ error: string }>(),
    'Add Product': props<{ cartItem: CartItem }>(),
    'Remove Product': props<{ cartItem: CartItem }>(),
    'Product Added Success': props<{ items: CartItem[] }>(),
    'Remove Product Success': props<{ items: CartItem[] }>(),
    'Modify Item': props<{ cartItem: CartItem }>(),
    'Modify Item Success': props<{ items: CartItem[] }>(),
  },
});
