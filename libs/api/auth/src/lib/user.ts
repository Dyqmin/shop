import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export type UserRole = 'Customer' | 'Admin' | 'Employee';

export interface User {
  shop_roles: UserRole[];
  sub: string;
}

export const User = createParamDecorator((data: string, context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
});
