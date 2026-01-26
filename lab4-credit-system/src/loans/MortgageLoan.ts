import { LoanApplication } from '../entities/LoanApplication';
import { Customer } from '../entities/Customer';

export class MortgageLoan extends LoanApplication {
  private readonly _propertyValue: number;
  private readonly _downPayment: number;

  constructor(
    id: string,
    customer: Customer,
    amount: number,
    termMonths: number,
    interestRate: number,
    propertyValue: number,
    downPayment: number,
  ) {
    super(id, customer, amount, termMonths, interestRate);
    this._propertyValue = propertyValue;
    this._downPayment = downPayment;
  }

  get propertyValue(): number {
    return this._propertyValue;
  }

  get downPayment(): number {
    return this._downPayment;
  }

  getType(): string {
    return 'MORTGAGE';
  }

  getDescription(): string {
    return `Mortgage loan for property worth $${this._propertyValue} with $${this._downPayment} down payment`;
  }

  getLoanToValueRatio(): number {
    return (this.amount / this._propertyValue) * 100;
  }
}