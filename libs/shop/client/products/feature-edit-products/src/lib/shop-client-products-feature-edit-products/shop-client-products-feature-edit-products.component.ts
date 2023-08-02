import { NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { injectProductDetailsFeature, injectProductsFeature } from "@shop-project/shop/client/products/data-access";
import { ProductFormComponent } from "@shop-project/shop/client/products/ui";
import { ButtonComponent } from "@shop-project/shop/client/shared/ui";
import { NewProduct } from "@shop-project/microservices/catalog/types";


@Component({
  selector: 'shop-project-shop-client-products-feature-edit-products',
  standalone: true,
  template: `
    <ng-container *ngIf="productDetailsFeature.product() as product">
      <shop-project-product-form [product]="product" (productSave)="save($event)" />
    </ng-container>
  `,
  imports: [ButtonComponent, NgIf, ProductFormComponent],
})
export class EditProductsComponent {
  productDetailsFeature = injectProductDetailsFeature();
  productsFeature = injectProductsFeature();

  save(modifiedProduct: NewProduct) {
    const product = this.productDetailsFeature.product();
    this.productsFeature.editProduct({
      ...product,
      ...modifiedProduct,
    })
  }
}
