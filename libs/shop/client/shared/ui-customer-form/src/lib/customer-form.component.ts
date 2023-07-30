import { Component, forwardRef, inject, Input } from "@angular/core";
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "@shop-project/shop/client/shared/ui";
import { NgIf } from "@angular/common";


export interface CustomerForm {
  name: string;
  city: string;
  street: string;
  zip: string;
  phone: string;
}

@Component({
  standalone: true,
  selector: 'shop-project-customer-form',
  template: `
    <div [formGroup]="form">
      <div class="flex flex-col text-slate-500 text-sm">
        <label for="name">{{ isCompany ? 'Nazwa firmy' : 'Imię i nazwisko'}}</label>
        <input
          type="text"
          formControlName="name"
          id="name"
          class="border-2 rounded-md p-1 text-xs" />
      </div>

      <div class="flex flex-col text-slate-500 text-sm">
        <label for="street">Ulica i numer</label>
        <input
          type="text"
          formControlName="street"
          id="street"
          class="border-2 rounded-md p-1 text-xs" />
      </div>

      <div class="flex flex-col text-slate-500 text-sm">
        <label for="zip">Kod pocztowy</label>
        <input type="text" formControlName="zipCode" id="zip" class="border-2 rounded-md p-1 text-xs" />
      </div>

      <div class="flex flex-col text-slate-500 text-sm">
        <label for="city">Miejscowość</label>
        <input
          type="text"
          formControlName="city"
          id="city"
          class="border-2 rounded-md p-1 text-xs" />
      </div>

      <div *ngIf="!isCompany" class="flex flex-col text-slate-500 text-sm">
        <label for="phone">Numer telefonu</label>
        <input
          type="text"
          formControlName="phone"
          id="phone"
          class="border-2 rounded-md p-1 text-xs" />
      </div>

      <div *ngIf="isCompany" class="flex flex-col text-slate-500 text-sm">
        <label for="taxNumber">NIP</label>
        <input
          type="text"
          formControlName="taxNumber"
          id="taxNumber"
          class="border-2 rounded-md p-1 text-xs" />
      </div>
    </div>
  `,
  imports: [ReactiveFormsModule, ButtonComponent, NgIf],
})
export class CustomerFormComponent {
  @Input() form!: FormGroup;
  @Input() isCompany = false;
  private readonly _fb = inject(FormBuilder);

  private createCustomerFormGroup() {
    return this._fb.nonNullable.group<CustomerForm>({
      name: '',
      city: '',
      street: '',
      zip: '',
      phone: '',
    });
  }
}
