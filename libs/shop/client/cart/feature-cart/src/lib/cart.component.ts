import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '@shop-project/microservices/cart/types';
import { injectCartFeature } from '@shop-project/shop/client/cart/data-access';
import { CartItemComponent, CartPreviewComponent } from '@shop-project/shop/client/cart/ui';
import { ButtonComponent } from '@shop-project/shop/client/shared/ui';

@Component({
  standalone: true,
  template: `
    <h2 class="text-2xl mb-3">Koszyk ({{ cartFeature.cartItems().length }})</h2>
    <shop-project-cart-preview
      [disabled]="cartFeature.itemsFetching()"
      [cartItems]="cartFeature.cartItems()"
      [isEditable]="true"
      (quantityChange)="onQuantityChange($event)"
      (remove)="onRemove($event)" />

    <div class="flex justify-between my-3">
      <span>Łączna kwota: {{ cartFeature.fullPrice() }}</span>
      <shop-project-button [disabled]="!cartFeature.cartItems().length" (btnClick)="createOrder()">
        Złóż zamówienie
      </shop-project-button>
    </div>
  `,
  selector: 'shop-project-cart',
  imports: [NgIf, NgFor, CartItemComponent, ButtonComponent, CartPreviewComponent],
})
export class CartComponent {
  readonly cartFeature = injectCartFeature();
  private readonly _router = inject(Router);

  onRemove(cartItem: CartItem) {
    this.cartFeature.removeFromCart(cartItem);
  }

  onQuantityChange(data: { quantity: number; cartItem: CartItem }) {
    this.cartFeature.modifyCart({ ...data.cartItem, quantity: data.quantity });
  }

  createOrder() {
    this._router.navigateByUrl('/orders/create-order');
  }
}
