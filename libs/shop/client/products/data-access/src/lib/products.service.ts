import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewProduct, Product } from '@shop-project/microservices/catalog/types';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  private readonly _http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>('http://localhost:3333/api/products');
  }

  getProduct(id: number): Observable<Product | null> {
    return this._http
      .get<Product[]>(`http://localhost:3333/api/products/${id}`)
      .pipe(map(products => products[0] || null));
  }

  insertProduct(product: NewProduct): Observable<Product | null> {
    return this._http
      .post<Product[]>(`http://localhost:3333/api/products`, product)
      .pipe(map(products => products[0] || null));
  }
}
