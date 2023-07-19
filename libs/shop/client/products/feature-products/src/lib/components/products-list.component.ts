import {Component, inject} from "@angular/core";
import {ProductsService} from "@shop-project/shop/client/products/data-access";
import {ProductItemComponent} from "@shop-project/shop/client/products/ui";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'shop-project-products-list',
  template: `
    <div *ngIf="getProducts$ | async as products">
      <shop-project-product *ngFor="let product of products" [product]="product" />
    </div>
  `,
  imports: [
    ProductItemComponent,
    NgForOf,
    AsyncPipe,
    NgIf,
  ]
})
export class ProductsListComponent {
  getProducts$ = inject(ProductsService).getProducts();
}
