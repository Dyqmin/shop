import { NgClass, NgIf } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewCustomerPayload, NewShipmentPayload } from '@shop-project/microservices/orders/types';
import { injectCartFeature } from '@shop-project/shop/client/cart/data-access';
import { CartPreviewComponent } from '@shop-project/shop/client/cart/ui';
import { injectOrdersFeature } from '@shop-project/shop/client/orders/data-access';
import { ButtonComponent } from '@shop-project/shop/client/shared/ui';
import { CustomerFormComponent } from '@shop-project/shop/client/shared/ui-customer-form';
import { startWith, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'shop-project-create-order',
  template: `
    <shop-project-cart-preview
      [disabled]="cartFeature.itemsFetching()"
      [cartItems]="cartFeature.cartItems()"
      [isEditable]="false" />

    Suma zamówienia {{ cartFeature.fullPrice() }} PLN

    <div>
      <span class="text-2xl block">Kupujesz jako</span>
      <div
        [ngClass]="{ 'border-green-600': !isCompany() }"
        class=" inline-block p-2 border-2 rounded-md mr-2"
        (click)="isCompany.set(false)">
        Osoba Fizyczna
      </div>
      <div
        [ngClass]="{ 'border-green-600': isCompany() }"
        class="inline-block p-2 border-2 rounded-md"
        (click)="isCompany.set(true)">
        Firma
      </div>
    </div>

    <form [formGroup]="shipmentForm" class="grid gap-4">
      <ng-container *ngIf="!isCompany(); else companyForm">
        <span class="text-xl mt-2">Dane do faktury</span>
        <shop-project-customer-form [form]="shipmentForm.controls.customer" />

        <div class="flex items-center">
          <label for="shipmentSameAsCustomer" class="mr-2">
            Dane do wysyłki takie same jak do faktury
          </label>
          <input
            type="checkbox"
            id="shipmentSameAsCustomer"
            formControlName="shipmentSameAsCustomer" />
        </div>

        <ng-container *ngIf="!shipmentForm.value.shipmentSameAsCustomer">
          <span class="text-xl mt-2">Dane do wysyłki</span>
          <shop-project-customer-form [form]="shipmentForm.controls.shipment" />
        </ng-container>
      </ng-container>

      <ng-template #companyForm>
        <span class="text-xl mt-2">Dane do faktury</span>
        <shop-project-customer-form [form]="shipmentForm.controls.customer" [isCompany]="true" />
        <span class="text-xl mt-2">Dane do wysyłki</span>
        <shop-project-customer-form [form]="shipmentForm.controls.shipment" />
      </ng-template>

      <shop-project-button (btnClick)="onSubmit()" [disabled]="shipmentForm.invalid"
        >Potwierdź</shop-project-button
      >
    </form>
  `,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    CartPreviewComponent,
    CustomerFormComponent,
    NgIf,
    NgClass,
  ],
})
export class CreateOrderComponent implements OnInit {
  cartFeature = injectCartFeature();
  ordersFeature = injectOrdersFeature();
  destroyRef = inject(DestroyRef);
  isCompany = signal(false);
  private readonly _fb = inject(NonNullableFormBuilder);
  shipmentForm = this._fb.group({
    customer: this.createCustomerFormGroup(true),
    shipment: this.createCustomerFormGroup(),
    shipmentSameAsCustomer: [true],
  });

  constructor() {
    effect(() => {
      if (this.isCompany()) {
        this.shipmentForm.controls.shipment.enable();
      } else if (!this.isCompany() && !this.shipmentForm.controls.shipmentSameAsCustomer.value) {
        this.shipmentForm.controls.shipment.enable();
      } else {
        this.shipmentForm.controls.shipment.disable();
      }
    });
  }

  ngOnInit() {
    this.shipmentForm.controls.shipmentSameAsCustomer.valueChanges
      .pipe(
        startWith(this.shipmentForm.controls.shipmentSameAsCustomer.value),
        tap(value => {
          if (value) {
            this.shipmentForm.controls.shipment.disable();
          } else {
            this.shipmentForm.controls.shipment.enable();
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private createCustomerFormGroup(withTaxNumber = false) {
    return this._fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      phone: ['', Validators.required],
      ...(withTaxNumber && { taxNumber: '' }),
    });
  }

  onSubmit() {
    this.ordersFeature.createOrder({
      lineItems: this.cartFeature.getAsLineItems(),
      customer: this.getCustomerFormData(),
      shipment: this.getShipmentFormData(),
    });
  }

  private getCustomerFormData(): NewCustomerPayload {
    return this.isCompany()
      ? { ...this.shipmentForm.getRawValue().customer, taxNumber: '' }
      : this.shipmentForm.getRawValue().customer;
  }

  private getShipmentFormData(): NewShipmentPayload {
    return this.shipmentForm.getRawValue().shipmentSameAsCustomer
      ? {
          name: this.shipmentForm.getRawValue().customer.name,
          city: this.shipmentForm.getRawValue().customer.city,
          zipCode: this.shipmentForm.getRawValue().customer.zipCode,
          phone: this.shipmentForm.getRawValue().customer.phone,
          street: this.shipmentForm.getRawValue().customer.street,
        }
      : this.shipmentForm.getRawValue().shipment;
  }
}
