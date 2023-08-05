import { Pipe, PipeTransform } from '@angular/core';
import { PaymentStatus } from '@shop-project/microservices/orders/types';

@Pipe({
  standalone: true,
  name: 'paymentStatusName',
})
export class PaymentStatusPipe implements PipeTransform {
  transform(value: PaymentStatus): string {
    switch (value) {
      case 'pending':
        return 'Oczekiwanie';
      case 'paid':
        return 'Opłacono';
      default:
        return '';
    }
  }
}
