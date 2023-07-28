import { NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectOrdersFeature } from '@shop-project/shop/client/orders/data-access';
import { OrderItemComponent } from '@shop-project/shop/client/orders/ui';

@Component({
  standalone: true,
  selector: 'shop-project-orders-list',
  template: `
    <ng-container *ngIf="ordersFeature.orders() as orders">
      <shop-project-order-item
        *ngFor="let order of orders"
        [order]="order"
        (detailsClick)="onDetailsClick(order.id)" />
    </ng-container>
  `,
  imports: [NgForOf, NgIf, OrderItemComponent],
})
export class OrdersListComponent {
  ordersFeature = injectOrdersFeature();
  private readonly _router = inject(Router);

  onDetailsClick(id: number) {
    this._router.navigate(['orders', id]);
  }
}
