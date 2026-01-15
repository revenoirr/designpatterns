export class Guest {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _email: string;
  private readonly _phone: string;

  constructor(id: string, name: string, email: string, phone: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._phone = phone;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  toString(): string {
    return `${this._name} (${this._email})`;
  }
}