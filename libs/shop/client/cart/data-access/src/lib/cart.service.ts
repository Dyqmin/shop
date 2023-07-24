import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '@shop-project/microservices/cart/types';

@Injectable()
export class CartService {
  private readonly _http = inject(HttpClient);

  getCart(): Observable<CartItem[]> {
    return this._http.get<CartItem[]>('http://localhost:3333/api/cart');
  }

  addOrRemoveItem(cartItem: CartItem): Observable<CartItem[]> {
    return this._http.post<CartItem[]>('http://localhost:3333/api/cart', cartItem);
  }

  removeItem(cartItem: CartItem): Observable<CartItem[]> {
    return this._http.delete<CartItem[]>(`http://localhost:3333/api/cart/${cartItem.product.id}`);
  }
}
