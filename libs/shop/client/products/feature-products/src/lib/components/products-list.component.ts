import { Component } from '@angular/core';
import { injectProductsFeature } from '@shop-project/shop/client/products/data-access';
import { ProductItemComponent } from '@shop-project/shop/client/products/ui';
import { NgForOf, NgIf } from '@angular/common';
import { injectCartFeature } from '@shop-project/shop/client/cart/data-access';
import { Product } from '@shop-project/microservices/catalog/types';

@Component({
  standalone: true,
  selector: 'shop-project-products-list',
  template: `
    <div *ngIf="productsFeature.products() as products" class="grid grid-cols-3">
      <shop-project-product
        *ngFor="let product of products"
        [product]="product"
        (addItemToCart)="onAddItemToCart($event)" />
    </div>
  `,
  imports: [ProductItemComponent, NgForOf, NgIf],
})
export class ProductsListComponent {
  readonly productsFeature = injectProductsFeature();
  readonly cartFeature = injectCartFeature();

  onAddItemToCart(product: Product) {
    this.cartFeature.addToCart({
      product,
      quantity: 1,
    });
  }
}
