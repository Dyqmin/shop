import {
  Component,
  effect,
  EventEmitter,
  inject,
  Injector,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { CartItem } from '@shop-project/microservices/cart/types';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'shop-project-cart-item',
  template: `
    <div class="grid grid-cols-4 flex justify-between border-b-2 pb-2 mb-2 items-center">
      <span>{{ cartItem.product.name }}</span>
      <span>{{ cartItem.product.price }}</span>
      <input
        class="border-b-gray-300 border-2 rounded-md p-2 w-16"
        #qty
        type="number"
        [value]="quantity()"
        (change)="quantity.set(+qty.value)" />
      <button class="bg-red-800 text-white p-1 w-16 rounded-md text-sm hover:bg-red-700 transition duration-300" (click)="remove.emit()">Usuń</button>
    </div>
  `,
  imports: [ReactiveFormsModule],
})
export class CartItemComponent implements OnInit {
  @Input({ required: true }) cartItem!: CartItem;
  quantity = signal(1);
  private readonly _injector = inject(Injector);
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  ngOnInit() {
    // this.quantity.set(this.cartItem.quantity);
    effect(
      () => {
        console.log(this.quantity());
        this.quantityChange.emit(this.quantity());
      },
      { injector: this._injector }
    );
  }
}
