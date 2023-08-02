import { Component } from "@angular/core";
import { injectProductDetailsFeature } from "@shop-project/shop/client/products/data-access";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { injectCartFeature } from "@shop-project/shop/client/cart/data-access";
import { ButtonComponent } from "@shop-project/shop/client/shared/ui";

@Component({
  standalone: true,
  selector: 'shop-project-product-details',
  template: `
    <ng-container *ngIf="productsFeature.product() as product">
      <div class="grid grid-cols-2 gap-4 w-full">
        <div>
          <span class="text-4xl">{{product.name}}</span>
          <img [ngSrc]="product.imageUrl!" width="400" height="400" />
        </div>
        <div class="w-full">
          <span >{{product.description || 'No desc'}}</span>

          <div class="flex justify-between border-t-2 mt-2 pt-2">
            <span class="text-2xl">{{product.price}} PLN</span>
            <shop-project-button (btnClick)="onAddToCart()">
              Dodaj do koszyka
            </shop-project-button>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  imports: [
    NgIf,
    NgOptimizedImage,
    ButtonComponent,
  ]
})
export class ProductDetailsComponent {
  productsFeature = injectProductDetailsFeature();
  cartFeature = injectCartFeature();

  onAddToCart() {
    const product = this.productsFeature.product();
    if (product) {
      this.cartFeature.addToCart({
        quantity: 1,
        product: product,
      })
    }
  }
}
