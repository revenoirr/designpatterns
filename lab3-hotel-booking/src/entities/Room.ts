export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  SUITE = 'SUITE',
  DELUXE = 'DELUXE',
}

export class Room {
  private readonly _id: string;
  private readonly _number: string;
  private readonly _type: RoomType;
  private readonly _pricePerNight: number;
  private _isAvailable: boolean;

  constructor(id: string, number: string, type: RoomType, pricePerNight: number) {
    this._id = id;
    this._number = number;
    this._type = type;
    this._pricePerNight = pricePerNight;
    this._isAvailable = true;
  }

  get id(): string {
    return this._id;
  }

  get number(): string {
    return this._number;
  }

  get type(): RoomType {
    return this._type;
  }

  get pricePerNight(): number {
    return this._pricePerNight;
  }

  get isAvailable(): boolean {
    return this._isAvailable;
  }

  setAvailable(available: boolean): void {
    this._isAvailable = available;
  }

  toString(): string {
    return `Room ${this._number} (${this._type}) - $${this._pricePerNight}/night`;
  }
}