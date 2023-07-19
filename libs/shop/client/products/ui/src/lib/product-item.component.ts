import {Component, Input} from "@angular/core";
import {Product} from "@shop-project/microservices/catalog/types";
import {NgOptimizedImage} from "@angular/common";

@Component({
  standalone: true,
  selector: 'shop-project-product',
  template: `
    <div class="border-2 border-gray-800 border-opacity-25 rounded-md p-3 max-w-[250px] flex flex-col justify-center items-center">
      <span class="text-2xl text-gray-800">{{ product.name }}</span>
      <img [ngSrc]="product.imageUrl!" width="200" height="200" />
      <div class="flex justify-between w-full items-center mt-2">
        <span>{{ product.price }} PLN</span>
        <button class="bg-gray-800 text-white p-2 rounded-md text-sm">Dodaj</button>
      </div>
    </div>
  `,
  imports: [
    NgOptimizedImage
  ]
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;
}
