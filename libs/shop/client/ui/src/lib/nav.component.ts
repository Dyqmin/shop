import { AsyncPipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { isEmployee$, nickname$ } from '@shop-project/shop/client/auth/data-access';
import { filter, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'shop-project-nav',
  template: `<nav class="my-5">
      <div class="flex justify-between max-w-screen-lg w-full mx-auto my-4 px-2 lg:px-0">
        <div>
          <span class="text-5xl mb-2">Sklep Market</span>
        </div>

        <div class="hidden md:flex flex-row">
          <ng-container *ngTemplateOutlet="userCart"></ng-container>
        </div>
        <div class="flex md:hidden items-center justify-center" (click)="isShown.set(!isShown())">
          <svg
            *ngIf="!isShown(); else x"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-8 h-8">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <ng-template #x>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </ng-template>
        </div>
      </div>
      <div
        [ngClass]="{
        'md:block fixed w-full h-full': isShown(),
        'hidden md:block': !isShown(),
      }"
        class="hidden md:block text-xl bg-gray-800 text-gray-100 py-2">
        <div
          class="max-w-screen-lg w-full mx-auto flex flex-col md:flex-row justify-between px-2 lg:px-0 gap-5">
          <div class="flex md:hidden flex-row justify-between p-4 border-b-2 mb-2 border-white">
            <ng-container *ngTemplateOutlet="userCart"></ng-container>
          </div>
          <a routerLink="/">Strona główna</a>
          <a routerLink="/products">Produkty</a>
          <a routerLink="/orders">Zamówienia</a>
          <a routerLink="/contact">Kontakt</a>
          <ng-container *ngIf="isEmployee$ | async">
            <a routerLink="/employee">Panel Pracownika</a>
          </ng-container>
        </div>
      </div>
    </nav>

    <ng-template #userCart>
      <div class="flex flex-col items-center mr-4">
        <span class="text-xs">Witaj,</span>
        <span>{{ nickname$ | async }}</span>
      </div>
      <a
        routerLink="/cart"
        class="flex flex-col justify-center items-center bg-blue-500 rounded-full w-9 h-9">
        <div class="flex flex-col justify-center items-center relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>

          <span
            class="absolute flex items-center justify-center -bottom-3 -right-3 bg-blue-800 rounded-full text-xs w-5 h-5 text-white"
            >{{ cartItems }}</span
          >
        </div>
      </a>
    </ng-template> `,
  imports: [RouterLink, AsyncPipe, NgIf, NgClass, NgTemplateOutlet],
})
export class NavComponent implements OnInit {
  @Input() cartItems = 0;
  readonly isEmployee$ = isEmployee$();
  readonly nickname$ = nickname$();
  isShown = signal(false);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter(val => val instanceof NavigationEnd),
        tap(() => this.isShown.set(false)),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
