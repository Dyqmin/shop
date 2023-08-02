import { Route } from "@angular/router";
import { employeeGuard } from "@shop-project/shop/client/auth/data-access";
import { EmployeeDashboardComponent } from "@shop-project/shop/client/employee/feature-dashboard";

export const employeeShellRoutes = [
  {
    path: '',
    canActivate: [employeeGuard],
    children: [
      {
        path: '',
        component: EmployeeDashboardComponent,
      }
    ]
  }
] as Route[];
