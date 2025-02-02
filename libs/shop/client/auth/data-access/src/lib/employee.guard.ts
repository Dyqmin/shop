import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter, map, Observable } from 'rxjs';

export const isEmployee$ = (): Observable<boolean> => {
  const _auth = inject(AuthService);
  return _auth.user$.pipe(
    map(user => {
      if (user && 'shop_roles' in user) {
        const roles: string[] = user['shop_roles'];
        return roles.includes('Employee');
      }
      return false;
    })
  );
};

export const nickname$ = () => {
  const _auth = inject(AuthService);

  return _auth.user$.pipe(
    filter(user => !!user),
    map(user => user?.nickname)
  );
};

export const employeeGuard: CanActivateFn = () => {
  return isEmployee$();
};
