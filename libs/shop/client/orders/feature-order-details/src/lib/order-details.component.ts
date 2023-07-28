import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { injectOrderDetailsFeature } from "@shop-project/shop/client/orders/data-access";

@Component({
  standalone: true,
  selector: 'shop-project-order-details',
  template: `
    <ng-container *ngIf="orderDetailsFeature.order() as order">
      <span class="text-3xl block">Zamówienie #{{order.id}}</span>
      <span>{{order.date}}</span>
    </ng-container>
  `,
  imports: [NgIf],
})
export class OrderDetailsComponent {
  public orderDetailsFeature = injectOrderDetailsFeature();
}
