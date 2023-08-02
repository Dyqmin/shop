import { CanActivateFn } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { inject } from "@angular/core";
import { map } from "rxjs";

export const employeeGuard: CanActivateFn = () => {
  const _auth = inject(AuthService);
  return _auth.user$.pipe(
    map((user) => {
      if (user && 'shop_roles' in user) {
        const roles: string[] = user['shop_roles'];
        return roles.includes('Employee');
      }
      return false;
    })
  );
}
