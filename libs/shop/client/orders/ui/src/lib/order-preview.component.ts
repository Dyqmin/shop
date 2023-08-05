import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from '@shop-project/microservices/orders/types';
import { PaymentStatusPipe, StatusPipe } from '@shop-project/shop/client/orders/utils';
import { ButtonComponent } from '@shop-project/shop/client/shared/ui';

@Component({
  standalone: true,
  selector: 'shop-project-order-preview',
  template: `
    <div class="grid grid-cols-6 my-4">
      <div class="flex flex-col">
        <span class="text-xs text-slate-600">Numer zamówienia</span>
        <span>{{ order.id }}</span>
      </div>

      <div class="flex flex-col">
        <span class="text-xs text-slate-600">Data</span>
        <span>{{ order.date }}</span>
      </div>

      <div class="flex flex-col">
        <span class="text-xs text-slate-600">Status zamówienia</span>
        <span>{{ order.status | statusName }}</span>
      </div>

      <div class="flex flex-col">
        <span class="text-xs text-slate-600">Status płatności</span>
        <span>{{ order.paymentStatus | paymentStatusName }}</span>
      </div>

      <shop-project-button [routerLink]="['..', order.id]">Szczegóły</shop-project-button>
      <shop-project-button [routerLink]="['..', order.id, 'edit']">Edytuj</shop-project-button>
    </div>
  `,
  imports: [ButtonComponent, NgIf, RouterLink, StatusPipe, PaymentStatusPipe],
})
export class OrderPreviewComponent {
  @Input({ required: true }) order!: Order;
}
