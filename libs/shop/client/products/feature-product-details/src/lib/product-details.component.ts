import { Component } from "@angular/core";
import { injectProductDetailsFeature } from "@shop-project/shop/client/products/data-access";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { injectCartFeature } from "@shop-project/shop/client/cart/data-access";

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
            <button (click)="onAddToCart()" class="bg-green-800 text-white p-1 w-32 rounded-md text-sm hover:bg-green-700 transition duration-300">Dodaj do koszyka</button>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  imports: [
    NgIf,
    NgOptimizedImage
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
