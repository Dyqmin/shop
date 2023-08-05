import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'shop-project-employee-dashboard',
  template: `
    <span class="block text-3xl mb-3">Panel Pracownika</span>
    <div class="grid grid-cols-2">
      <a routerLink="/products/create" class="block">
        <div class="border-2 border-gray-800 border-opacity-25 rounded-md p-3 max-w-[250px] flex flex-col justify-center items-center hover:scale-105 transition">
          Utwórz produkt
        </div>
      </a>
      <a routerLink="/orders/manage" class="block">
        <div class="border-2 border-gray-800 border-opacity-25 rounded-md p-3 max-w-[250px] flex flex-col justify-center items-center hover:scale-105 transition">
          Zarządzaj zamówieniami
        </div>
      </a>
    </div>
  `,
  imports: [RouterLink],
})
export class EmployeeDashboardComponent {}
