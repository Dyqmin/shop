import { Component } from '@angular/core';
import { injectCartFeature } from '@shop-project/shop/client/cart/data-access';
import { NgFor, NgIf } from '@angular/common';
import { CartItemComponent } from '@shop-project/shop/client/cart/ui';

@Component({
  standalone: true,
  template: `
    <ng-container *ngIf="cartFeature.cartItems() as cartItems">
      <shop-project-cart-item
        *ngFor="let cartItem of cartItems"
        [cartItem]="cartItem" />
    </ng-container>
  `,
  selector: 'shop-project-cart',
  imports: [NgIf, NgFor, CartItemComponent],
})
export class CartComponent {
  readonly cartFeature = injectCartFeature();
}
