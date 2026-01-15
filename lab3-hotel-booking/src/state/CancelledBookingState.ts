import { BookingState } from './BookingState';
import { Booking } from '../entities/Booking';

export class CancelledBookingState extends BookingState {
  confirm(_booking: Booking): void {
    throw new Error('Cannot confirm: booking is cancelled');
  }

  checkIn(_booking: Booking): void {
    throw new Error('Cannot check in: booking is cancelled');
  }

  checkOut(_booking: Booking): void {
    throw new Error('Cannot check out: booking is cancelled');
  }

  cancel(_booking: Booking): void {
    throw new Error('Booking is already cancelled');
  }

  getStatus(): string {
    return 'CANCELLED';
  }
}