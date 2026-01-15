// src/hotel/facade/HotelBookingFacade.ts

import { Room, RoomType } from '../entities/Room';
import { Guest } from '../entities/Guest';
import { Booking } from '../entities/Booking';
import { RoomService } from '../services/RoomService';
import { GuestService } from '../services/GuestService';
import { BookingService } from '../services/BookingService';
import { PaymentService } from '../services/PaymentService';
import { NotificationService } from '../services/NotificationService';

export class HotelBookingFacade {
  private roomService: RoomService;
  private guestService: GuestService;
  private bookingService: BookingService;
  private paymentService: PaymentService;
  private notificationService: NotificationService;

  constructor() {
    this.roomService = new RoomService();
    this.guestService = new GuestService();
    this.bookingService = new BookingService();
    this.paymentService = new PaymentService();
    this.notificationService = new NotificationService();
  }

  initializeSystem(): void {
    this.roomService.addRoom(new Room('R001', '101', RoomType.SINGLE, 100));
    this.roomService.addRoom(new Room('R002', '102', RoomType.DOUBLE, 150));
    this.roomService.addRoom(new Room('R003', '201', RoomType.SUITE, 300));
    this.roomService.addRoom(new Room('R004', '202', RoomType.DELUXE, 500));
    this.roomService.addRoom(new Room('R005', '103', RoomType.SINGLE, 100));

    console.log('✅ Hotel system initialized with 5 rooms');
  }

  registerGuest(name: string, email: string, phone: string): Guest {
    const guestId = `G${Date.now().toString().slice(-6)}`;
    const guest = new Guest(guestId, name, email, phone);
    this.guestService.addGuest(guest);

    console.log(`✅ Guest registered: ${guest.name}`);
    return guest;
  }

  checkAvailability(roomType?: RoomType): Room[] {
    const availableRooms = roomType
      ? this.roomService.getAvailableRoomsByType(roomType)
      : this.roomService.getAvailableRooms();

    console.log(`📋 Available rooms${roomType ? ` (${roomType})` : ''}: ${availableRooms.length}`);
    return availableRooms;
  }


  makeBooking(
    guestId: string,
    roomId: string,
    checkInDate: Date,
    checkOutDate: Date,
    cardNumber: string,
  ): Booking | null {
    console.log(' 🏨 Starting booking process...');

    const guest = this.guestService.getGuestById(guestId);
    if (!guest) {
      console.log('❌ Guest not found');
      return null;
    }

    const room = this.roomService.getRoomById(roomId);
    if (!room) {
      console.log('❌ Room not found');
      return null;
    }

    if (!room.isAvailable) {
      console.log('❌ Room is not available');
      return null;
    }

    const booking = this.bookingService.createBooking(guest, room, checkInDate, checkOutDate);
    console.log(`✅ Booking created: ${booking.id}`);

    const totalPrice = booking.calculateTotalPrice();
    const paymentSuccess = this.paymentService.processPayment(totalPrice, cardNumber);

    if (!paymentSuccess) {
      booking.cancel();
      console.log('❌ Booking cancelled due to payment failure');
      return null;
    }

    this.notificationService.sendEmail(
      guest,
      'Booking Confirmation',
      `Your booking ${booking.id} has been created. Total: $${totalPrice.toFixed(2)}`,
    );

    return booking;
  }

  confirmBooking(bookingId: string): boolean {
    const booking = this.bookingService.getBookingById(bookingId);
    if (!booking) {
      console.log('❌ Booking not found');
      return false;
    }

    try {
      booking.confirm();

      this.notificationService.sendEmail(
        booking.guest,
        'Booking Confirmed',
        `Your booking ${booking.id} has been confirmed!`,
      );

      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(`❌ ${error.message}`);
      }
      return false;
    }
  }

  checkInGuest(bookingId: string): boolean {
    const booking = this.bookingService.getBookingById(bookingId);
    if (!booking) {
      console.log('❌ Booking not found');
      return false;
    }

    try {
      booking.checkIn();

      this.notificationService.sendSMS(
        booking.guest,
        `Welcome! Your room number is ${booking.room.number}`,
      );

      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(`❌ ${error.message}`);
      }
      return false;
    }
  }

  checkOutGuest(bookingId: string): boolean {
    const booking = this.bookingService.getBookingById(bookingId);
    if (!booking) {
      console.log('❌ Booking not found');
      return false;
    }

    try {
      const totalPrice = booking.calculateTotalPrice();
      booking.checkOut();

      this.notificationService.sendEmail(
        booking.guest,
        'Thank You!',
        `Total bill: $${totalPrice.toFixed(2)}. We hope to see you again!`,
      );

      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(`❌ ${error.message}`);
      }
      return false;
    }
  }

  cancelBooking(bookingId: string): boolean {
    const booking = this.bookingService.getBookingById(bookingId);
    if (!booking) {
      console.log('❌ Booking not found');
      return false;
    }

    try {
      const totalPrice = booking.calculateTotalPrice();
      booking.cancel();

      this.paymentService.refundPayment(totalPrice);

      this.notificationService.sendEmail(
        booking.guest,
        'Booking Cancelled',
        `Your booking ${booking.id} has been cancelled. Refund: $${totalPrice.toFixed(2)}`,
      );

      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(`❌ ${error.message}`);
      }
      return false;
    }
  }

  getBookingInfo(bookingId: string): Booking | null {
    const booking = this.bookingService.getBookingById(bookingId);
    if (!booking) {
      console.log('❌ Booking not found');
      return null;
    }

    console.log(`
📋 Booking Information:`);
    console.log(`ID: ${booking.id}`);
    console.log(`Guest: ${booking.guest.name}`);
    console.log(`Room: ${booking.room.number} (${booking.room.type})`);
    console.log(`Check-in: ${booking.checkInDate.toLocaleDateString()}`);
    console.log(`Check-out: ${booking.checkOutDate.toLocaleDateString()}`);
    console.log(`Status: ${booking.getStatus()}`);
    console.log(`Total: $${booking.calculateTotalPrice().toFixed(2)}`);

    return booking;
  }

  getActiveBookings(): Booking[] {
    return this.bookingService.getActiveBookings();
  }

  getGuestBookings(guestId: string): Booking[] {
    return this.bookingService.getGuestBookings(guestId);
  }
}