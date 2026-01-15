import { Guest } from '../entities/Guest';

export class NotificationService {
  sendEmail(guest: Guest, subject: string, message: string): void {
    console.log(`📧 Email to ${guest.email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
  }

  sendSMS(guest: Guest, message: string): void {
    console.log(`📱 SMS to ${guest.phone}: ${message}`);
  }
}