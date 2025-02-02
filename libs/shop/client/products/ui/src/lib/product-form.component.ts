import { Component, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NewProduct } from "@shop-project/microservices/catalog/types";
import { ButtonComponent } from "@shop-project/shop/client/shared/ui";

@Component({
  standalone: true,
  selector: 'shop-project-product-form',
  template: `
    <form [formGroup]="form">
      <div class="flex flex-col text-slate-500 text-sm">
        <label for="name">Nazwa produktu</label>
        <input
          type="text"
          formControlName="name"
          id="name"
          class="border-2 rounded-md p-1 text-xs" />
      </div>
      <div class="flex flex-col text-slate-500 text-sm">
        <label for="price">Cena</label>
        <input
          type="number"
          formControlName="price"
          id="price"
          class="border-2 rounded-md p-1 text-xs" />
      </div>
      <div class="flex flex-col text-slate-500 text-sm">
        <label for="quantity">Ilość magazynowa</label>
        <input
          type="number"
          formControlName="quantity"
          id="quantity"
          class="border-2 rounded-md p-1 text-xs" />
      </div>
      <div class="flex flex-col text-slate-500 text-sm">
        <label for="description">Opis</label>
        <textarea
          formControlName="description"
          id="description"
          class="border-2 rounded-md p-1 text-xs"></textarea>
      </div>
      <div class="flex flex-col text-slate-500 text-sm">
        <label for="imageUrl">Adres URL zdjęcia</label>
        <input
          type="text"
          formControlName="imageUrl"
          id="imageUrl"
          class="border-2 rounded-md p-1 text-xs" />
      </div>
      <div class="flex items-center text-slate-500 text-sm">
        <label for="isFeatured" class="mr-2">Promowany</label>
        <input
          type="checkbox"
          formControlName="isFeatured"
          id="isFeatured"
          class="border-2 rounded-md p-1 text-xs" />
      </div>
      <shop-project-button (btnClick)="onSave()">Zapisz</shop-project-button>
    </form>
  `,
  imports: [ButtonComponent, ReactiveFormsModule],
})
export class ProductFormComponent implements OnInit {
  @Input() product?: NewProduct;
  @Output() productSave = new EventEmitter<NewProduct>();

  private readonly _fb = inject(FormBuilder);

  form = this._fb.nonNullable.group({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    imageUrl: '',
    isFeatured: false,
  });

  ngOnInit() {
    if (this.product) {
      this.form.patchValue({
        quantity: this.product.quantity,
        description: this.product.description || '',
        imageUrl: this.product.imageUrl || '',
        isFeatured: this.product.isFeatured,
        price: parseFloat(this.product.price),
        name: this.product.name,
      });
    }
  }

  onSave() {
    this.productSave.emit(this.mapFormToSchema());
  }

  private mapFormToSchema(): NewProduct {
    return {
      ...this.form.getRawValue(),
      price: this.form.getRawValue().price.toString(),
    };
  }
}
