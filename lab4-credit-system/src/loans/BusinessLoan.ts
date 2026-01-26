import { LoanApplication } from '../entities/LoanApplication';
import { Customer } from '../entities/Customer';

export class BusinessLoan extends LoanApplication {
  private readonly _businessName: string;
  private readonly _businessType: string;
  private readonly _yearsInBusiness: number;

  constructor(
    id: string,
    customer: Customer,
    amount: number,
    termMonths: number,
    interestRate: number,
    businessName: string,
    businessType: string,
    yearsInBusiness: number,
  ) {
    super(id, customer, amount, termMonths, interestRate);
    this._businessName = businessName;
    this._businessType = businessType;
    this._yearsInBusiness = yearsInBusiness;
  }

  get businessName(): string {
    return this._businessName;
  }

  get businessType(): string {
    return this._businessType;
  }

  get yearsInBusiness(): number {
    return this._yearsInBusiness;
  }

  getType(): string {
    return 'BUSINESS';
  }

  getDescription(): string {
    return `Business loan for ${this._businessName} (${this._businessType})`;
  }
}