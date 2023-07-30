import { NgIf } from "@angular/common";
import { Component, Directive, Input, signal } from '@angular/core';
import { Order, OrderCustomer, OrderShipment } from '@shop-project/microservices/orders/types';


//
// @Directive({
//   standalone: true,
//   selector: '[idk]',
// })
// class

@Component({
  standalone: true,
  selector: 'shop-project-order-customer',
  template: `
    <div *ngIf="data() as customer">
      <span class="text-2xl">{{ isShipment ? 'Adres dostawy' : 'Dane do faktury'}}</span>
      <div class="grid grid-cols-2">
        <div class="flex flex-col">
          <span class="text-xs text-slate-600" *ngIf="!customer.taxNumber; else company">Imię i nazwisko</span>
          <ng-template #company><span class="text-xs text-slate-600">Nazwa firmy</span></ng-template>
          <span>{{ customer.name }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-slate-600">Ulica i numer</span>
          <span>{{ customer.street }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-slate-600">Miejscowość</span>
          <span>{{ customer.city }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-slate-600">Kod pocztowy</span>
          <span>{{ customer.zipCode }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-slate-600">Numer telefonu</span>
          <span>{{ customer.phone }}</span>
        </div>

        <div class="flex flex-col" *ngIf="customer.taxNumber">
          <span class="text-xs text-slate-600">NIP</span>
          <span>{{ customer.taxNumber }}</span>
        </div>
      </div>
    </div>
  `,
  imports: [NgIf],
})
export class OrderCustomerComponent {
  @Input()
  set orderCustomer(value: OrderCustomer) {
    this.data.set(value);
  }
  @Input()
  set orderShipment(value: OrderShipment) {
    this.data.set({ ...value, taxNumber: '' });
  }
  @Input({ required: true }) isShipment!: boolean;

  data = signal<OrderCustomer | null>(null);
}
