import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NavComponent} from "@shop-project/shop/client/ui";

@Component({
  standalone: true,
  imports: [RouterModule, NavComponent],
  selector: 'shop-project-root',
  template: `
    <shop-project-nav />
    <main class="max-w-screen-lg w-full mx-auto">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  title = 'shop-app';
}
