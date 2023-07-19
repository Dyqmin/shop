import {Component, Input} from "@angular/core";
import {Product} from "@shop-project/microservices/catalog/types";

@Component({
  standalone: true,
  selector: 'shop-project-product',
  template: `
    <div>
      {{ product.name }}
    </div>
  `,
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
}
