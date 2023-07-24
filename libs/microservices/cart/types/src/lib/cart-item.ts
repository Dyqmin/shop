import { Product } from '@shop-project/microservices/catalog/types';

export interface CartItem {
  product: Product;
  quantity: number;
}
