import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideShell } from '@shop-project/shop/client/shell';
import { provideToastr } from "ngx-toastr";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom([
      AuthModule.forRoot({
        domain: 'domin-shop.eu.auth0.com',
        clientId: 'Rb4YsKblmOPHuKyYlSLIPyGqY5UR5FVc',
        httpInterceptor: {
          allowedList: ['*'],
        },
        authorizationParams: {
          redirect_uri: window.location.origin,
          audience: 'shop-gateway',
          scope: 'openid profile email',
        },
      }),
    ]),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(),
    provideStoreDevtools({connectInZone: true}),
    provideShell(),
    provideToastr({
      positionClass: 'toast-bottom-right'
    }),
    provideAnimations(),
  ],
};
