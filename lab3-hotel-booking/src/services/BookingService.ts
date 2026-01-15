import { Booking } from '../entities/Booking';
import { Room } from '../entities/Room';
import { Guest } from '../entities/Guest';

export class BookingService {
  private bookings: Map<string, Booking>;
  private bookingCounter: number;

  constructor() {
    this.bookings = new Map();
    this.bookingCounter = 1;
  }

  createBooking(
    guest: Guest,
    room: Room,
    checkInDate: Date,
    checkOutDate: Date,
  ): Booking {
    const bookingId = `BK${this.bookingCounter.toString().padStart(4, '0')}`;
    this.bookingCounter += 1;

    const booking = new Booking(bookingId, guest, room, checkInDate, checkOutDate);
    this.bookings.set(bookingId, booking);

    room.setAvailable(false);

    return booking;
  }

  getBookingById(bookingId: string): Booking | undefined {
    return this.bookings.get(bookingId);
  }

  getAllBookings(): Booking[] {
    return Array.from(this.bookings.values());
  }

  getActiveBookings(): Booking[] {
    return this.getAllBookings().filter(
      (booking) => booking.getStatus() !== 'CANCELLED'
        && booking.getStatus() !== 'CHECKED_OUT',
    );
  }

  getGuestBookings(guestId: string): Booking[] {
    return this.getAllBookings().filter((booking) => booking.guest.id === guestId);
  }
}