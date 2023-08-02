import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NewProduct } from '@shop-project/microservices/catalog/types';
import { injectProductsFeature } from '@shop-project/shop/client/products/data-access';
import { ButtonComponent } from '@shop-project/shop/client/shared/ui';
import { ProductFormComponent } from "@shop-project/shop/client/products/ui";

@Component({
  standalone: true,
  selector: 'shop-project-create-product',
  template: `
    <span class="text-2xl">Dodawanie Produktu</span>
    <shop-project-product-form (productSave)="save($event)" />
  `,
  imports: [ReactiveFormsModule, ButtonComponent, ProductFormComponent],
})
export class CreateProductComponent {
  readonly productsFeature = injectProductsFeature();

  save(product: NewProduct) {
    this.productsFeature.createProduct(product);
  }
}
