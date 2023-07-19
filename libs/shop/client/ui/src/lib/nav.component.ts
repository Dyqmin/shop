import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  selector: 'shop-project-nav',
  template: `
    <nav class="max-w-screen-lg w-full mx-auto p-3 md:p-0">
      <span class="text-3xl flex justify-center">Sklep Market</span>
      <div class="flex justify-between">
        <a routerLink="/">Strona główna</a>
        <a routerLink="/products">Produkty</a>
        <a routerLink="/orders">Zamówienia</a>
        <a routerLink="/cart">Koszyk</a>
        <a routerLink="/contact">Kontakt</a>
      </div>
    </nav>`,
  imports: [
    RouterLink
  ]
})
export class NavComponent {
  title = 'shop-app';
}
