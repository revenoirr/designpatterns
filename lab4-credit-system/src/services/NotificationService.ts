import { Customer } from '../entities/Customer';

export class NotificationService {
  sendEmail(customer: Customer, subject: string, message: string): void {
    console.log(`📧 Email to ${customer.email}:`);
    console.log(`   Subject: ${subject}`);
    console.log(`   ${message}`);
  }

  sendSMS(customer: Customer, message: string): void {
    console.log(`📱 SMS to ${customer.name}: ${message}`);
  }
}