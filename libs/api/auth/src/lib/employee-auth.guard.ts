import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Auth0Guard } from './auth.guard';
import { User } from './user';

@Injectable()
export class EmployeeAuth0Guard extends Auth0Guard {
  override canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return (super.canActivate(context) as Promise<boolean>).then(isAuthenticated => {
      if (!isAuthenticated) {
        return false;
      }

      const user: User = context.switchToHttp().getRequest().user;

      return user.shop_roles.includes('Employee');
    });
  }
}
