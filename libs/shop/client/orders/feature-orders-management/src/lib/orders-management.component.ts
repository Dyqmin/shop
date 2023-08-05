import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { injectOrdersFeature } from '@shop-project/shop/client/orders/data-access';
import { OrderPreviewComponent } from '@shop-project/shop/client/orders/ui';

@Component({
  standalone: true,
  selector: 'shop-project-orders-management',
  template: `
    <ng-container *ngIf="ordersFeature.orders() as orders">
      <shop-project-order-preview *ngFor="let order of orders" [order]="order" />
    </ng-container>
  `,
  imports: [NgFor, NgIf, OrderPreviewComponent],
})
export class OrdersManagementComponent {
  ordersFeature = injectOrdersFeature();
}
