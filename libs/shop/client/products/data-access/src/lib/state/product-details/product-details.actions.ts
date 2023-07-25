import { createActionGroup, props } from "@ngrx/store";
import { Product } from "@shop-project/microservices/catalog/types";

export const ProductDetailsActions = createActionGroup({
  source: 'Product Details',
  events: {
    'Fetch current product': props<{ id: number }>(),
    'Fetch single Product Failure': props<{ error: string }>(),
    'Fetch single Product Success': props<{ product: Product | null }>(),
  }
});
