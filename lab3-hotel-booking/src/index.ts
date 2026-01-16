import { HotelBookingFacade } from './facade/HotelBookingFacade';

const hotel = new HotelBookingFacade();
hotel.initializeSystem();

console.log('Hotel Booking System initialized');
console.log('Run "npm run demo" to see the demo');