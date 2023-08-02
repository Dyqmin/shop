import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from "@auth0/auth0-angular";
import { NavComponent } from "@shop-project/shop/client/ui";


@Component({
  standalone: true,
  imports: [RouterModule, NavComponent, NgIf, AsyncPipe],
  selector: 'shop-project-root',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else notAuthenticated">
      <shop-project-nav />
      <main class="max-w-screen-lg w-full mx-auto">
        <router-outlet></router-outlet>
      </main>
      </ng-container>
    <ng-template #notAuthenticated><router-outlet></router-outlet></ng-template>
  `,
})
export class AppComponent {
  title = 'shop-app';
  auth = inject(AuthService);
}
