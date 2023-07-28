import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Order } from "@shop-project/microservices/orders/types";
import { ButtonComponent } from "@shop-project/shop/client/shared/ui";


@Component({
  standalone: true,
  selector: 'shop-project-order-item',
  template: `
    <div class="w-full border-b-gray-300 border-2 rounded-md my-2 p-2 ">
      <span class="text-2xl">Zamówienie #{{order.id}}</span>
      <div class="grid grid-cols-5 gap-2">
        <div>
          <span class="block text-xs text-slate-600">Status zamówienia</span>
          <span>{{ order.status }}</span>
        </div>

        <div>
          <span class="block text-xs text-slate-600">Status płatności</span>
          <span>{{ order.paymentStatus }}</span>
        </div>

        <div>
          <span class="block text-xs text-slate-600">Data</span>
          <span>{{ order.date }}</span>
        </div>

        <div>
          <span class="block text-xs text-slate-600">Suma zamówienia</span>
          <span>{{ order.totalAmount }}</span>
        </div>

        <shop-project-button (btnClick)="detailsClick.emit()">Szczegóły</shop-project-button>
      </div>
    </div>
  `,
  imports: [ButtonComponent],
})
export class OrderItemComponent {
  @Input({ required: true }) order!: Order;
  @Output() detailsClick = new EventEmitter<void>()
}
