import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  standalone: true,
  selector: 'shop-project-button',
  template: `
    <button
      class="text-white p-2 rounded-md text-sm transition duration-300 disabled:bg-gray-500"
      [disabled]="disabled"
      [ngClass]="{
        'bg-green-800 hover:bg-green-700': type === 'success',
        'bg-gray-800 hover:bg-gray-700': type === 'info',
        'bg-red-800 hover:bg-red-700': type === 'danger',
      }"
      (click)="btnClick.emit()">
      <ng-content></ng-content>
    </button>
  `,
  imports: [
    NgClass
  ]
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() type: 'success' | 'danger' | 'info' = 'success';
  @Output() btnClick = new EventEmitter<void>();
}
