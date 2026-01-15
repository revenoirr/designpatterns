import { Guest } from '../entities/Guest';

export class GuestService {
  private guests: Map<string, Guest>;

  constructor() {
    this.guests = new Map();
  }

  addGuest(guest: Guest): void {
    this.guests.set(guest.id, guest);
  }

  getGuestById(guestId: string): Guest | undefined {
    return this.guests.get(guestId);
  }

  findGuestByEmail(email: string): Guest | undefined {
    return Array.from(this.guests.values()).find((guest) => guest.email === email);
  }

  getAllGuests(): Guest[] {
    return Array.from(this.guests.values());
  }
}