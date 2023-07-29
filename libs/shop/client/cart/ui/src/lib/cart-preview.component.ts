import { NgForOf, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CartItem } from '@shop-project/microservices/cart/types';
import { CartItemComponent } from "./cart-item.component";
import { ButtonComponent } from '@shop-project/shop/client/shared/ui';

@Component({
  standalone: true,
  selector: 'shop-project-cart-preview',
  template: `
    <ng-container *ngIf="cartItems as cartItems">
      <div class="grid grid-cols-4 text-lg font-bold">
        <span>Nazwa</span>
        <span>Cena</span>
        <span>Ilość</span>
        <span *ngIf="isEditable">Akcje</span>
      </div>
      <shop-project-cart-item
        *ngFor="let cartItem of cartItems"
        [cartItem]="cartItem"
        [disabled]="disabled"
        [isEditable]="isEditable"
        (remove)="remove.emit(cartItem)"
        (quantityChange)="quantityChange.emit({ quantity: $event, cartItem: cartItem})" />
    </ng-container>
  `,
  imports: [ReactiveFormsModule, ButtonComponent, CartItemComponent, NgForOf, NgIf],
})
export class CartPreviewComponent {
  @Input({ required: true }) cartItems!: CartItem[];
  @Input() disabled = true;
  @Input() isEditable = false;

  @Output() quantityChange = new EventEmitter<{ quantity: number; cartItem: CartItem }>();
  @Output() remove = new EventEmitter<CartItem>();
}
