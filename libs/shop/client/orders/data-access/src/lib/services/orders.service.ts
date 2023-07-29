import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewOrderDto, Order, OrderWithLineItem } from '@shop-project/microservices/orders/types';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersService {
  private readonly _http = inject(HttpClient);

  getOrders(): Observable<Order[]> {
    return this._http.get<Order[]>('http://localhost:3333/api/orders');
  }

  getOrder(id: number): Observable<OrderWithLineItem> {
    return this._http.get<OrderWithLineItem>(`http://localhost:3333/api/orders/${id}`);
  }

  createOrder(orderDto: NewOrderDto): Observable<OrderWithLineItem> {
    return this._http.post<OrderWithLineItem>(`http://localhost:3333/api/orders`, orderDto);
  }
}
