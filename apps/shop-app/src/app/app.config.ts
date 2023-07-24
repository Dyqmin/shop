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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom([
      AuthModule.forRoot({
        domain: 'dev-5bvy0pqb0cg0k864.us.auth0.com',
        clientId: '4UutVnSMUyG03cKwLFTEDLHHrywWTd9l',
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
    provideStoreDevtools(),
    provideShell(),
  ],
};
