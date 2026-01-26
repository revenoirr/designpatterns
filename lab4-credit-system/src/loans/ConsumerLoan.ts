import { LoanApplication } from '../entities/LoanApplication';
import { Customer } from '../entities/Customer';

export class ConsumerLoan extends LoanApplication {
  private readonly _purpose: string;

  constructor(
    id: string,
    customer: Customer,
    amount: number,
    termMonths: number,
    interestRate: number,
    purpose: string,
  ) {
    super(id, customer, amount, termMonths, interestRate);
    this._purpose = purpose;
  }

  get purpose(): string {
    return this._purpose;
  }

  getType(): string {
    return 'CONSUMER';
  }

  getDescription(): string {
    return `Consumer loan for ${this._purpose}`;
  }
}