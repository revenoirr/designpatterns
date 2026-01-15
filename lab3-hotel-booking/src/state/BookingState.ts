import { Booking } from '../entities/Booking';

export abstract class BookingState {
  abstract confirm(booking: Booking): void;
  abstract checkIn(booking: Booking): void;
  abstract checkOut(booking: Booking): void;
  abstract cancel(booking: Booking): void;
  abstract getStatus(): string;
}