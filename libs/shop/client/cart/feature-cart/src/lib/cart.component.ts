import { Component, inject } from '@angular/core';
import { CartService } from '@shop-project/shop/client/cart/data-access';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CartItemComponent } from '@shop-project/shop/client/cart/ui';

@Component({
  standalone: true,
  template: `
    <ng-container *ngIf="cartItems$ | async as cartItems">
      <shop-project-cart-item
        *ngFor="let cartItem of cartItems"
        [cartItem]="cartItem" />
    </ng-container>
  `,
  selector: 'shop-project-cart',
  imports: [AsyncPipe, NgIf, NgFor, CartItemComponent],
})
export class CartComponent {
  private readonly _cartService = inject(CartService);
  cartItems$ = this._cartService.getCart();
}
