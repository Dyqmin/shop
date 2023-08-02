import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'shop-project-employee-dashboard',
  template: `
    <span class="block text-2xl">Panel Pracownika</span>
    <a routerLink="/products/create">
      <div class="border-2 border-gray-800 border-opacity-25 rounded-md p-3 max-w-[250px] flex flex-col justify-center items-center hover:scale-105 transition">
        Utwórz produkt
      </div>
    </a>
  `,
  imports: [RouterLink],
})
export class EmployeeDashboardComponent {}
