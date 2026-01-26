import { LoanDecorator } from './LoanDecorator';
import { LoanApplication } from '../entities/LoanApplication';

export class EarlyRepaymentDecorator extends LoanDecorator {
  private readonly setupFee = 500;

  constructor(loan: LoanApplication) {
    super(loan);
  }

  getFeatureName(): string {
    return 'Early Repayment Option';
  }

  getAdditionalCost(): number {
    return this.setupFee;
  }

  calculateTotalPayment(): number {
    return this.wrappedLoan.calculateTotalPayment() + this.getAdditionalCost();
  }

  getDescription(): string {
    return `${this.wrappedLoan.getDescription()} + Early Repayment (Fee: $${this.setupFee})`;
  }

  canRepayEarly(): boolean {
    return true;
  }

  calculateEarlyRepaymentAmount(remainingMonths: number): number {
    const remainingPrincipal = this.wrappedLoan.amount 
      * (remainingMonths / this.wrappedLoan.termMonths);
    return Math.round(remainingPrincipal * 100) / 100;
  }
}