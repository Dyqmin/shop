import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { injectCartFeature } from '@shop-project/shop/client/cart/data-access';
import { NavComponent } from '@shop-project/shop/client/ui';

@Component({
  standalone: true,
  imports: [RouterModule, NavComponent, NgIf, AsyncPipe],
  selector: 'shop-project-root',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else notAuthenticated">
      <shop-project-nav [cartItems]="cartFeature.cartItems()?.length || 0" />
      <main class="max-w-screen-lg w-full mx-auto px-2 lg:px-0">
        <router-outlet></router-outlet>
      </main>
    </ng-container>
    <ng-template #notAuthenticated><router-outlet></router-outlet></ng-template>
  `,
})
export class AppComponent {
  title = 'shop-app';
  auth = inject(AuthService);
  cartFeature = injectCartFeature();
}
