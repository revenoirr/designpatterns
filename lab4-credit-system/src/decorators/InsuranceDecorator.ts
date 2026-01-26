import { LoanDecorator } from './LoanDecorator';
import { LoanApplication } from '../entities/LoanApplication';

export class InsuranceDecorator extends LoanDecorator {
  private readonly insuranceRate = 0.5; 

  constructor(loan: LoanApplication) {
    super(loan);
  }

  getFeatureName(): string {
    return 'Credit Insurance';
  }

  getAdditionalCost(): number {
    const annualInsurance = (this.wrappedLoan.amount * this.insuranceRate) / 100;
    const totalInsurance = (annualInsurance * this.wrappedLoan.termMonths) / 12;
    return Math.round(totalInsurance * 100) / 100;
  }

  calculateMonthlyPayment(): number {
    const basePayment = this.wrappedLoan.calculateMonthlyPayment();
    const monthlyInsurance = this.getAdditionalCost() / this.wrappedLoan.termMonths;
    return Math.round((basePayment + monthlyInsurance) * 100) / 100;
  }

  calculateTotalPayment(): number {
    return this.wrappedLoan.calculateTotalPayment() + this.getAdditionalCost();
  }

  getDescription(): string {
    return `${this.wrappedLoan.getDescription()} + Insurance ($${this.getAdditionalCost()})`;
  }
}