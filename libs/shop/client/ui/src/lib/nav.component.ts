import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  selector: 'shop-project-nav',
  template: `
    <nav>
      <ul>
        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="/products">Products</a></li>
        <li><a routerLink="/contact">Contact</a></li>
      </ul>
    </nav>`,
  imports: [
    RouterLink
  ]
})
export class NavComponent {
  title = 'shop-app';
}
