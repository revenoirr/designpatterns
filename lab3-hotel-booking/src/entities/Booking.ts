import { Room } from './Room';
import { Guest } from './Guest';
import { BookingState } from '../state/BookingState';
import { NewBookingState } from '../state/NewBookingState';

export class Booking {
  private readonly _id: string;
  private readonly _guest: Guest;
  private readonly _room: Room;
  private readonly _checkInDate: Date;
  private readonly _checkOutDate: Date;
  private _state: BookingState;
  private readonly _createdAt: Date;

  constructor(
    id: string,
    guest: Guest,
    room: Room,
    checkInDate: Date,
    checkOutDate: Date,
  ) {
    this._id = id;
    this._guest = guest;
    this._room = room;
    this._checkInDate = checkInDate;
    this._checkOutDate = checkOutDate;
    this._state = new NewBookingState();
    this._createdAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get guest(): Guest {
    return this._guest;
  }

  get room(): Room {
    return this._room;
  }

  get checkInDate(): Date {
    return this._checkInDate;
  }

  get checkOutDate(): Date {
    return this._checkOutDate;
  }

  get state(): BookingState {
    return this._state;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  setState(state: BookingState): void {
    this._state = state;
  }

  confirm(): void {
    this._state.confirm(this);
  }

  checkIn(): void {
    this._state.checkIn(this);
  }

  checkOut(): void {
    this._state.checkOut(this);
  }

  cancel(): void {
    this._state.cancel(this);
  }

  getStatus(): string {
    return this._state.getStatus();
  }

  calculateTotalPrice(): number {
    const nights = Math.ceil(
      (this._checkOutDate.getTime() - this._checkInDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    return nights * this._room.pricePerNight;
  }

  toString(): string {
    return `Booking ${this._id}: ${this._guest.name} - ${this._room.number} (${this.getStatus()})`;
  }
}