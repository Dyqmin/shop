import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "@shop-project/microservices/catalog/types";

@Injectable()
export class ProductsService {
  private readonly _http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>('http://localhost:3333/api/products');
  }
}
