import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { injectCartFeature } from '@shop-project/shop/client/cart/data-access';
import { CartPreviewComponent } from '@shop-project/shop/client/cart/ui';
import { OrdersService } from '@shop-project/shop/client/orders/data-access';
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

    <form [formGroup]="shipmentForm" class="grid gap-4">
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
  ],
})
export class CreateOrderComponent implements OnInit {
  cartFeature = injectCartFeature();
  ordersService = inject(OrdersService);
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);
  formBuilder = inject(FormBuilder);
  shipmentForm = this.formBuilder.group({
    customer: this.createCustomerFormGroup(),
    shipment: this.createCustomerFormGroup(),
    shipmentSameAsCustomer: [true],
  });

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

  private createCustomerFormGroup() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('submit');
    // this.ordersService.createOrder({
    //   order: {
    //
    //   },
    //   lineItems: [
    //     {
    //       quantity: 1,
    //       productId: 1,
    //     }
    //   ]
    // });
  }
}
