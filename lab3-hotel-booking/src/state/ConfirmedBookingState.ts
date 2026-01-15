import { BookingState } from './BookingState';
import { Booking } from '../entities/Booking';
import { CheckedInState } from './CheckedInState';
import { CancelledBookingState } from './CancelledBookingState';

export class ConfirmedBookingState extends BookingState {
  confirm(_booking: Booking): void {
    throw new Error('Booking is already confirmed');
  }

  checkIn(booking: Booking): void {
    console.log(`Guest ${booking.guest.name} checked in to room ${booking.room.number}`);
    booking.setState(new CheckedInState());
  }

  checkOut(_booking: Booking): void {
    throw new Error('Cannot check out: guest is not checked in');
  }

  cancel(booking: Booking): void {
    console.log(`Booking ${booking.id} cancelled`);
    booking.room.setAvailable(true);
    booking.setState(new CancelledBookingState());
  }

  getStatus(): string {
    return 'CONFIRMED';
  }
}