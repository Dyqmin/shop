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
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'shop-project-cart-item',
  template: `
    <div class="flex justify-between">
      <span>{{ cartItem.product.name }}</span>
      <span>{{ cartItem.quantity }}</span>
      <input
        #qty
        type="number"
        [value]="quantity()"
        (change)="quantity.set(+qty.value)" />
    </div>
  `,
  imports: [ReactiveFormsModule],
})
export class CartItemComponent implements OnInit {
  @Input({ required: true }) cartItem!: CartItem;
  quantity = signal(1);
  private readonly _injector = inject(Injector);
  @Output() quantityChange = new EventEmitter<number>();

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
