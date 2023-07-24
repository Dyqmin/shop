import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "@shop-project/microservices/catalog/types";

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    enter: emptyProps(),
    'Products Loaded Success': props<{ products: Product[] }>(),
    'Products Loaded Failure': props<{ error: string }>(),
    'Product Selected': props<{ id: number }>(),
  }
});
