import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'shop-project-auth-button',
  template: '<button (click)="auth.loginWithRedirect()">Log in</button>',
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
