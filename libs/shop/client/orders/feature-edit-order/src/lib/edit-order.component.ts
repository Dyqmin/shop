import { NgFor, NgIf } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  OrderStatus,
  PaymentStatus,
  paymentStatusValues,
  statusSchemaValues,
} from '@shop-project/microservices/orders/types';
import { injectOrderDetailsFeature } from '@shop-project/shop/client/orders/data-access';
import { OrderPreviewComponent } from '@shop-project/shop/client/orders/ui';
import { PaymentStatusPipe, StatusPipe } from '@shop-project/shop/client/orders/utils';
import { ButtonComponent } from '@shop-project/shop/client/shared/ui';

@Component({
  standalone: true,
  selector: 'shop-project-edit-order',
  template: `
    <ng-container *ngIf="orderFeature.order() as order">
      <span class="block text-3xl mb-4">Edycja zamówienia #{{ order.id }}</span>

      <form [formGroup]="form" class="block max-w-[400px] grid gap-3">
        <div class="flex flex-col text-slate-500 text-sm">
          <label for="status">Status zamówienia</label>
          <select formControlName="status" id="status" class="border-2 rounded-md p-1 text-xs">
            <option *ngFor="let option of statusOptions" [value]="option">
              {{ option | statusName }}
            </option>
          </select>
        </div>

        <div class="flex flex-col text-slate-500 text-sm">
          <label for="paymentStatus">Status płatności</label>
          <select
            formControlName="paymentStatus"
            id="paymentStatus"
            class="border-2 rounded-md p-1 text-xs">
            <option *ngFor="let option of paymentStatusOptions" [value]="option">
              {{ option | paymentStatusName }}
            </option>
          </select>
        </div>

        <shop-project-button (btnClick)="save()">Zapisz</shop-project-button>
      </form>
    </ng-container>
  `,
  imports: [
    NgFor,
    NgIf,
    OrderPreviewComponent,
    ReactiveFormsModule,
    ButtonComponent,
    PaymentStatusPipe,
    StatusPipe,
  ],
})
export class EditOrderComponent {
  orderFeature = injectOrderDetailsFeature();
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    status: [''],
    paymentStatus: [''],
  });

  readonly statusOptions = Object.values(statusSchemaValues);
  readonly paymentStatusOptions = Object.values(paymentStatusValues);

  constructor() {
    effect(() => {
      const order = this.orderFeature.order();

      if (order) {
        this.form.controls.paymentStatus.setValue(order.paymentStatus);
        this.form.controls.status.setValue(order.status);
      }
    });
  }

  save() {
    const order = this.orderFeature.order();
    const status = this.form.getRawValue().status as OrderStatus;
    const paymentStatus = this.form.getRawValue().paymentStatus as PaymentStatus;
    if (order) {
      this.orderFeature.edit(order.id, { status, paymentStatus });
    }
  }
}
