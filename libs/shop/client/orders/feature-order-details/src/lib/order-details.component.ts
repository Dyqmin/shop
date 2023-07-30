import { NgIf } from "@angular/common";
import { Component, Signal } from "@angular/core";
import { OrderView } from "@shop-project/microservices/orders/types";
import { injectOrderDetailsFeature } from "@shop-project/shop/client/orders/data-access";
import { OrderCustomerComponent, OrderLineItemsComponent } from "@shop-project/shop/client/orders/ui";

@Component({
  standalone: true,
  selector: 'shop-project-order-details',
  template: `
    <ng-container *ngIf="ord() as order">
      <span class="text-3xl block">Zamówienie #{{ order.id }}</span>
      <shop-project-order-line-items [lineItems]="order.orderLineItems" />
      <div class="grid grid-cols-4 border-t-2 py-2 mb-2">
        <div>Łączna suma zamówienia</div>
        <div></div>
        <div></div>
        <span>{{ order.totalAmount }} PLN</span>
      </div>
      <shop-project-order-customer [orderCustomer]="order.orderCustomers" [isShipment]="false" />
      <shop-project-order-customer [orderShipment]="order.orderShipments" [isShipment]="true" />
    </ng-container>
  `,
  imports: [NgIf, OrderCustomerComponent, OrderLineItemsComponent],
})
export class OrderDetailsComponent {
  public orderDetailsFeature = injectOrderDetailsFeature();
  // temp solution to resolve types in webstorm
  ord: Signal<OrderView | null> = this.orderDetailsFeature.order;
}
