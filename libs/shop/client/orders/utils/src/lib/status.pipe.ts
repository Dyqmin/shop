import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '@shop-project/microservices/orders/types';

@Pipe({
  standalone: true,
  name: 'statusName',
})
export class StatusPipe implements PipeTransform {
  transform(value: OrderStatus): string {
    switch (value) {
      case 'pending':
        return 'Oczekiwanie';
      case 'preparing':
        return 'Przygotowywanie';
      case 'shipped':
        return 'Wysłano';
      default:
        return '';
    }
  }
}
