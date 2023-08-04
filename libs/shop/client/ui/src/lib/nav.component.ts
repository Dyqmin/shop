import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter, map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { isEmployee$ } from "@shop-project/shop/client/auth/data-access";

@Component({
  standalone: true,
  selector: 'shop-project-nav',
  template: `<nav class="my-5">
    <div class="flex justify-between max-w-screen-lg w-full mx-auto px-2 lg:px-0">
      <div>
        <span class="text-5xl flex justify-center mb-2">Sklep Market</span>
      </div>

      <div class="flex flex-row">
        <div class="flex flex-col items-center mr-4">
          <span class="text-xs">Witaj,</span>
          <span>{{ nickname$ | async }}</span>
        </div>
        <a routerLink="/cart">
          <div class="flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span class="text-xs">Koszyk</span>
          </div>
        </a>
      </div>
    </div>
    <div class="text-xl bg-gray-800 text-gray-100 py-2">
      <div class="max-w-screen-lg w-full mx-auto flex justify-between px-2 lg:px-0">
        <a routerLink="/">Strona główna</a>
        <a routerLink="/products">Produkty</a>
        <a routerLink="/orders">Zamówienia</a>
        <a routerLink="/contact">Kontakt</a>
        <ng-container *ngIf="isEmployee$ | async">
          <a routerLink="/employee">Panel Pracownika</a>
        </ng-container>
      </div>
    </div>
  </nav>`,
  imports: [RouterLink, AsyncPipe, NgIf],
})
export class NavComponent {
  private readonly _auth = inject(AuthService);
  readonly isEmployee$ = isEmployee$();
  nickname$ = this._auth.user$.pipe(
    filter(user => !!user),
    map(user => user?.nickname)
  );
}
