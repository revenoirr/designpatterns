import { BookingState } from './BookingState';
import { Booking } from '../entities/Booking';

export class CheckedOutState extends BookingState {
  confirm(_booking: Booking): void {
    throw new Error('Booking is already completed');
  }

  checkIn(_booking: Booking): void {
    throw new Error('Cannot check in: booking is already completed');
  }

  checkOut(_booking: Booking): void {
    throw new Error('Guest is already checked out');
  }

  cancel(_booking: Booking): void {
    throw new Error('Cannot cancel: booking is already completed');
  }

  getStatus(): string {
    return 'CHECKED_OUT';
  }
}