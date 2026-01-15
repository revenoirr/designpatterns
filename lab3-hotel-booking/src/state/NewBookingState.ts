import { BookingState } from './BookingState';
import { Booking } from '../entities/Booking';
import { ConfirmedBookingState } from './ConfirmedBookingState';
import { CancelledBookingState } from './CancelledBookingState';

export class NewBookingState extends BookingState {
  confirm(booking: Booking): void {
    console.log(`Booking ${booking.id} confirmed`);
    booking.setState(new ConfirmedBookingState());
  }

  checkIn(_booking: Booking): void {
    throw new Error('Cannot check in: booking must be confirmed first');
  }

  checkOut(_booking: Booking): void {
    throw new Error('Cannot check out: booking is not checked in');
  }

  cancel(booking: Booking): void {
    console.log(`Booking ${booking.id} cancelled`);
    booking.room.setAvailable(true);
    booking.setState(new CancelledBookingState());
  }

  getStatus(): string {
    return 'NEW';
  }
}