import { Component, DestroyRef, inject } from '@angular/core';
import { injectProductsFeature } from '@shop-project/shop/client/products/data-access';
import { ProductItemComponent } from '@shop-project/shop/client/products/ui';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { CartService } from '@shop-project/shop/client/cart/data-access';
import { Product } from '@shop-project/microservices/catalog/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'shop-project-products-list',
  template: `
    <div *ngIf="productsFeature.products() as products">
      <shop-project-product
        *ngFor="let product of products"
        [product]="product"
        (addItemToCart)="onAddItemToCart($event)" />
    </div>
  `,
  imports: [ProductItemComponent, NgForOf, AsyncPipe, NgIf],
})
export class ProductsListComponent {
  private readonly _cartService = inject(CartService);
  private readonly _destroyRef = inject(DestroyRef);
  readonly productsFeature = injectProductsFeature();

  onAddItemToCart(product: Product) {
    this._cartService
      .addItem({
        product,
        quantity: 1,
      })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
}
