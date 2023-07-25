import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@shop-project/microservices/catalog/types';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "@shop-project/shop/client/shared/ui";

@Component({
  standalone: true,
  selector: 'shop-project-product',
  template: `
    <div
      class="border-2 border-gray-800 border-opacity-25 rounded-md p-3 max-w-[250px] flex flex-col justify-center items-center hover:scale-105 transition">
      <a [routerLink]="[product.id]">
        <span class="text-2xl text-gray-800 text-center block">{{ product.name }}</span>
        <img [ngSrc]="product.imageUrl!" width="200" height="200" />
      </a>
      <div class="flex justify-between w-full items-center mt-2">
        <span>{{ product.price }} PLN</span>
        <shop-project-button (click)="addItemToCart.emit(product)">
          Dodaj
        </shop-project-button>
      </div>
    </div>
  `,
  imports: [NgOptimizedImage, RouterLink, ButtonComponent],
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;
  @Output() addItemToCart = new EventEmitter<Product>()
}
