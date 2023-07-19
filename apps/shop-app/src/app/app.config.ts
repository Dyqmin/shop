import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    importProvidersFrom([
      AuthModule.forRoot({
        domain: 'dev-5bvy0pqb0cg0k864.us.auth0.com',
        clientId: '4UutVnSMUyG03cKwLFTEDLHHrywWTd9l',
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      }),
    ]),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
};
