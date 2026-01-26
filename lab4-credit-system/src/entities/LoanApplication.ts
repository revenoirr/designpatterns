import { Customer } from './Customer';

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PROCESSING = 'PROCESSING',
}

export abstract class LoanApplication {
  private readonly _id: string;
  private readonly _customer: Customer;
  private readonly _amount: number;
  private readonly _termMonths: number;
  private _status: LoanStatus;
  private _interestRate: number;
  private readonly _createdAt: Date;

  constructor(
    id: string,
    customer: Customer,
    amount: number,
    termMonths: number,
    interestRate: number,
  ) {
    this._id = id;
    this._customer = customer;
    this._amount = amount;
    this._termMonths = termMonths;
    this._interestRate = interestRate;
    this._status = LoanStatus.PENDING;
    this._createdAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get customer(): Customer {
    return this._customer;
  }

  get amount(): number {
    return this._amount;
  }

  get termMonths(): number {
    return this._termMonths;
  }

  get status(): LoanStatus {
    return this._status;
  }

  get interestRate(): number {
    return this._interestRate;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  setStatus(status: LoanStatus): void {
    this._status = status;
  }

  setInterestRate(rate: number): void {
    this._interestRate = rate;
  }

  calculateMonthlyPayment(): number {
    const monthlyRate = this._interestRate / 100 / 12;
    const payment = this._amount
      * (monthlyRate * (1 + monthlyRate) ** this._termMonths)
      / ((1 + monthlyRate) ** this._termMonths - 1);
    return Math.round(payment * 100) / 100;
  }

  calculateTotalPayment(): number {
    return this.calculateMonthlyPayment() * this._termMonths;
  }

  abstract getDescription(): string;

  abstract getType(): string;

  toString(): string {
    return `${this.getType()} #${this._id}: $${this._amount} for ${this._termMonths} months (${this._status})`;
  }
}