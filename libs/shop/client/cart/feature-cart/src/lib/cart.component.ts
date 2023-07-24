import { Component } from '@angular/core';
import { injectCartFeature } from '@shop-project/shop/client/cart/data-access';
import { NgFor, NgIf } from '@angular/common';
import { CartItemComponent } from '@shop-project/shop/client/cart/ui';
import { CartItem } from '@shop-project/microservices/cart/types';

@Component({
  standalone: true,
  template: `
    <h2 class="text-2xl mb-3">Koszyk ({{ cartFeature.cartItems().length }})</h2>
    <ng-container *ngIf="cartFeature.cartItems() as cartItems">
      <div class="grid grid-cols-4 text-lg font-bold">
        <span>Nazwa</span>
        <span>Cena</span>
        <span>Ilość</span>
        <span>Akcje</span>
      </div>
      <shop-project-cart-item
        *ngFor="let cartItem of cartItems"
        [cartItem]="cartItem"
        [disabled]="cartFeature.itemsFetching()"
        (remove)="onRemove(cartItem)"
        (quantityChange)="onQuantityChange($event, cartItem)" />
    </ng-container>

    <div class="flex justify-between my-3">
      <span>Łączna kwota: {{ cartFeature.fullPrice() }}</span>
      <button
        class="bg-green-800 text-white p-1 w-32 rounded-md text-sm hover:bg-green-700 transition duration-300">
        Złóż zamówienie
      </button>
    </div>
  `,
  selector: 'shop-project-cart',
  imports: [NgIf, NgFor, CartItemComponent],
})
export class CartComponent {
  readonly cartFeature = injectCartFeature();

  onRemove(cartItem: CartItem) {
    this.cartFeature.removeFromCart(cartItem);
  }

  onQuantityChange(qty: number, cartItem: CartItem) {
    this.cartFeature.modifyCart({ ...cartItem, quantity: qty });
  }
}
