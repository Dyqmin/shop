import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ButtonComponent } from "@shop-project/shop/client/shared/ui";
import { tap } from 'rxjs';


@Component({
  standalone: true,
  selector: 'shop-project-auth-button',
  template: `
    <div class="mx-auto w-full flex justify-center flex-col items-center mt-4">
      <span class="text-3xl block">Logowanie do Sklepu Market</span>
      <shop-project-button (btnClick)="auth.loginWithRedirect()">Zaloguj się</shop-project-button>
    </div>
  `,
  imports: [ButtonComponent],
})
export class AuthButtonComponent implements OnInit {
  auth = inject(AuthService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);

  ngOnInit() {
    this.auth.isAuthenticated$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap(isAuthenticated => {
          if (isAuthenticated) {
            this._router.navigateByUrl('/home');
          }
        })
      )
      .subscribe();
  }
}
