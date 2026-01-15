import { Room, RoomType } from '../entities/Room';

export class RoomService {
  private rooms: Map<string, Room>;

  constructor() {
    this.rooms = new Map();
  }

  addRoom(room: Room): void {
    this.rooms.set(room.id, room);
  }

  getRoomById(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  getAvailableRooms(): Room[] {
    return Array.from(this.rooms.values()).filter((room) => room.isAvailable);
  }

  getAvailableRoomsByType(type: RoomType): Room[] {
    return this.getAvailableRooms().filter((room) => room.type === type);
  }

  isRoomAvailable(roomId: string): boolean {
    const room = this.rooms.get(roomId);
    return room ? room.isAvailable : false;
  }

  getAllRooms(): Room[] {
    return Array.from(this.rooms.values());
  }
}