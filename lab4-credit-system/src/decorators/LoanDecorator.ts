import { LoanApplication } from '../entities/LoanApplication';

export abstract class LoanDecorator extends LoanApplication {
  protected wrappedLoan: LoanApplication;

  constructor(loan: LoanApplication) {
    super(
      loan.id,
      loan.customer,
      loan.amount,
      loan.termMonths,
      loan.interestRate,
    );
    this.wrappedLoan = loan;
    this.setStatus(loan.status);
  }

  getType(): string {
    return this.wrappedLoan.getType();
  }

  getDescription(): string {
    return this.wrappedLoan.getDescription();
  }

  calculateMonthlyPayment(): number {
    return this.wrappedLoan.calculateMonthlyPayment();
  }

  calculateTotalPayment(): number {
    return this.wrappedLoan.calculateTotalPayment();
  }

  abstract getFeatureName(): string;
  abstract getAdditionalCost(): number;
}