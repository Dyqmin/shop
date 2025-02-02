import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CartItem } from '@shop-project/microservices/cart/types';
import { ButtonComponent } from '@shop-project/shop/client/shared/ui';

@Component({
  standalone: true,
  selector: 'shop-project-cart-item',
  template: `
    <div class="grid grid-cols-4 flex justify-between border-b-2 pb-2 mb-2 items-center">
      <span>{{ cartItem.product.name }}</span>
      <span>{{ cartItem.product.price }}</span>
      <input
        #qty
        *ngIf="isEditable; else staticQty"
        class="border-b-gray-300 border-2 rounded-md p-2 w-16"
        type="number"
        [value]="cartItem.quantity"
        [disabled]="disabled || !isEditable"
        (change)="quantityChange.emit(+qty.value)" />
      <ng-template #staticQty>
        <span>{{ cartItem.quantity }}</span>
      </ng-template>
      <shop-project-button
        *ngIf="isEditable"
        type="danger"
        [disabled]="disabled"
        (btnClick)="remove.emit()">
        Usuń
      </shop-project-button>
    </div>
  `,
  imports: [ReactiveFormsModule, ButtonComponent, NgIf],
})
export class CartItemComponent {
  @Input({ required: true }) cartItem!: CartItem;
  @Input() disabled = false;
  @Input() isEditable = false;
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();
}
