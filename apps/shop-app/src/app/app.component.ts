import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NavComponent} from "@shop-project/shop/client/ui";

@Component({
  standalone: true,
  imports: [RouterModule, NavComponent],
  selector: 'shop-project-root',
  template: `
    <shop-project-nav />
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'shop-app';
}
