import { LoanDecorator } from './LoanDecorator';
import { LoanApplication } from '../entities/LoanApplication';

export class GracePeriodDecorator extends LoanDecorator {
  private readonly gracePeriodMonths: number;
  private readonly serviceFee = 300;

  constructor(loan: LoanApplication, gracePeriodMonths: number = 6) {
    super(loan);
    this.gracePeriodMonths = gracePeriodMonths;
  }

  getFeatureName(): string {
    return `Grace Period (${this.gracePeriodMonths} months)`;
  }

  getAdditionalCost(): number {
    return this.serviceFee;
  }

  calculateMonthlyPayment(): number {
    const effectiveTermMonths = this.wrappedLoan.termMonths - this.gracePeriodMonths;
    const monthlyRate = this.wrappedLoan.interestRate / 100 / 12;
    const payment = this.wrappedLoan.amount
      * (monthlyRate * (1 + monthlyRate) ** effectiveTermMonths)
      / ((1 + monthlyRate) ** effectiveTermMonths - 1);
    return Math.round(payment * 100) / 100;
  }

  calculateTotalPayment(): number {
    return (
      this.calculateMonthlyPayment() * (this.wrappedLoan.termMonths - this.gracePeriodMonths)
      + this.serviceFee
    );
  }

  getDescription(): string {
    return `${this.wrappedLoan.getDescription()} + 
    ${this.gracePeriodMonths}-month Grace Period (Fee: $${this.serviceFee})`;
  }

  getGracePeriodMonths(): number {
    return this.gracePeriodMonths;
  }
}