import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'shop-project-error',
  imports: [AsyncPipe, NgIf],
  template: `
    <div class="container mt-5">
      <ng-container *ngIf="error$ | async as error">
        <h1>An error was returned from Auth0</h1>
        <p>
          Something went wrong when trying to authorize your application. Please
          inspect the error below and ensure <code>auth_config.json</code> is
          configured correctly.
        </p>
        <div class="alert alert-danger" role="alert">
          {{ error.message }}
        </div>
      </ng-container>
    </div>
  `,
})
export class ErrorComponent implements OnInit {
  public error$ = this.auth.error$;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    timer(0)
      .pipe(takeUntil(this.error$))
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }
}
