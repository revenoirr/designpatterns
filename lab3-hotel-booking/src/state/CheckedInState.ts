import { BookingState } from './BookingState';
import { Booking } from '../entities/Booking';
import { CheckedOutState } from './CheckedOutState';

export class CheckedInState extends BookingState {
  confirm(_booking: Booking): void {
    throw new Error('Booking is already confirmed and checked in');
  }

  checkIn(_booking: Booking): void {
    throw new Error('Guest is already checked in');
  }

  checkOut(booking: Booking): void {
    console.log(`Guest ${booking.guest.name} checked out from room ${booking.room.number}`);
    booking.room.setAvailable(true);
    booking.setState(new CheckedOutState());
  }

  cancel(_booking: Booking): void {
    throw new Error('Cannot cancel: guest is already checked in. Please check out first.');
  }

  getStatus(): string {
    return 'CHECKED_IN';
  }
}