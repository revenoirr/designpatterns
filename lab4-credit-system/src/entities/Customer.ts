export class Customer {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _email: string;
  private readonly _creditScore: number;
  private readonly _monthlyIncome: number;

  constructor(
    id: string,
    name: string,
    email: string,
    creditScore: number,
    monthlyIncome: number,
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._creditScore = creditScore;
    this._monthlyIncome = monthlyIncome;
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

  get creditScore(): number {
    return this._creditScore;
  }

  get monthlyIncome(): number {
    return this._monthlyIncome;
  }

  toString(): string {
    return `${this._name} (Score: ${this._creditScore}, Income: $${this._monthlyIncome})`;
  }
}

