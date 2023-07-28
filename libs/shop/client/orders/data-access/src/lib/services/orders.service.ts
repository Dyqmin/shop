import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order, OrderWithLineItem } from "@shop-project/microservices/orders/types";

@Injectable()
export class OrdersService {
  private readonly _http = inject(HttpClient);

  getOrders(): Observable<Order[]> {
    return this._http.get<Order[]>('http://localhost:3333/api/orders');
  }

  getOrder(id: number): Observable<OrderWithLineItem> {
    return this._http.get<OrderWithLineItem>(`http://localhost:3333/api/orders/${id}`);
  }
}
