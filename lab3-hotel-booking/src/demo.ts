import { HotelBookingFacade } from './facade/HotelBookingFacade';
import { RoomType } from './entities/Room';

function demonstrateHotelBookingSystem(): void {
  console.log('='.repeat(60));
  console.log('🏨 HOTEL BOOKING SYSTEM DEMO');
  console.log('='.repeat(60));

  const hotel = new HotelBookingFacade();

  console.log(' Step 1: Initialize System');
  hotel.initializeSystem();

  console.log(' Step 2: Register Guests');
  const guest1 = hotel.registerGuest('John Doe', 'john@email.com', '+1234567890');
  const guest2 = hotel.registerGuest('Jane Smith', 'jane@email.com', '+0987654321');

  console.log('Step 3: Check Room Availability');
  hotel.checkAvailability();
  hotel.checkAvailability(RoomType.SUITE);

  console.log('Step 4: Make Bookings');
  const checkIn = new Date('2025-02-01');
  const checkOut = new Date('2025-02-05');

  const booking1 = hotel.makeBooking(
    guest1.id,
    'R002', 
    checkIn,
    checkOut,
    '1234567890123456',
  );

  const booking2 = hotel.makeBooking(
    guest2.id,
    'R003', 
    checkIn,
    checkOut,
    '9876543210987654',
  );

  if (!booking1 || !booking2) {
    console.log('❌ Failed to create bookings');
    return;
  }

  console.log(' Step 5: State Pattern Demo - Booking Lifecycle');

  console.log('--- Booking 1 Lifecycle ---');
  hotel.getBookingInfo(booking1.id);


  console.log('🔄 Confirming booking...');
  hotel.confirmBooking(booking1.id);
  console.log(`Current status: ${booking1.getStatus()}`);

  console.log('🔄 Checking in guest...');
  hotel.checkInGuest(booking1.id);
  console.log(`Current status: ${booking1.getStatus()}`);

  console.log('🔄 Checking out guest...');
  hotel.checkOutGuest(booking1.id);
  console.log(`Current status: ${booking1.getStatus()}`);

  console.log('--- Booking 2 Cancellation ---');
  hotel.getBookingInfo(booking2.id);

  console.log('🔄 Confirming booking...');
  hotel.confirmBooking(booking2.id);

  console.log('🔄 Cancelling booking...');
  hotel.cancelBooking(booking2.id);
  console.log(`Current status: ${booking2.getStatus()}`);

  console.log(' Step 6: Testing Invalid State Transitions');

  const booking3 = hotel.makeBooking(
    guest1.id,
    'R004', 
    new Date('2025-03-01'),
    new Date('2025-03-03'),
    '1111222233334444',
  );

  if (booking3) {
    console.log('❌ Attempting to check in without confirmation...');
    hotel.checkInGuest(booking3.id);

    console.log('✅ Correct flow:');
    hotel.confirmBooking(booking3.id);
    hotel.checkInGuest(booking3.id);

    console.log('❌ Attempting to cancel after check-in...');
    hotel.cancelBooking(booking3.id);
  }

  console.log(' Step 7: View Active Bookings');
  const activeBookings = hotel.getActiveBookings();
  console.log(`
Active bookings: ${activeBookings.length}`);
  activeBookings.forEach((booking) => {
    console.log(`- ${booking.toString()}`);
  });

  console.log(' Step 8: Guest Booking History');
  const guestBookings = hotel.getGuestBookings(guest1.id);
  console.log(`
${guest1.name}'s bookings: ${guestBookings.length}`);
  guestBookings.forEach((booking) => {
    console.log(`- ${booking.toString()}`);
  });

  console.log('' + '='.repeat(60));
  console.log('✅ DEMO COMPLETED');
  console.log('='.repeat(60));
}

// Запуск демонстрации
demonstrateHotelBookingSystem();