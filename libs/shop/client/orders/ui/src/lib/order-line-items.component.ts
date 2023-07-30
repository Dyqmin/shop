import { NgFor, NgIf, NgOptimizedImage } from "@angular/common";
import { Component, Input } from '@angular/core';
import { LineItemView } from '@shop-project/microservices/orders/types';

@Component({
  standalone: true,
  selector: 'shop-project-order-line-items',
  template: `
    <div *ngFor="let lineItem of lineItems" class="grid grid-cols-4 items-center my-4">
      <img *ngIf="lineItem.product.imageUrl" [ngSrc]="lineItem.product.imageUrl" width="100" height="100" alt="product" />
      <span>{{lineItem.product.name}}</span>
      <span>x{{lineItem.quantity}}</span>
      <span>{{lineItem.product.price}} {{lineItem.product.currency}}</span>
    </div>
  `,
  imports: [NgIf, NgFor, NgOptimizedImage],
})
export class OrderLineItemsComponent {
  @Input({ required: true }) lineItems!: LineItemView[];
}
