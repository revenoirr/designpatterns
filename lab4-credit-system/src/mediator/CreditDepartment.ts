import { Department } from './BankMediator';
import { LoanApplication } from '../entities/LoanApplication';

export class CreditDepartment extends Department {
  private readonly minCreditScore = 580;
  private readonly minDebtToIncomeRatio = 0.43;

  processLoan(loan: LoanApplication): boolean {
    console.log(`💳 [${this.name}] Checking credit for loan ${loan.id}...`);

    if (loan.customer.creditScore < this.minCreditScore) {
      console.log(` [${this.name}] Credit score too low: ${loan.customer.creditScore}`);
      this.mediator.notify(this.name, 'CHECK_FAILED', loan);
      return false;
    }

    const monthlyPayment = loan.calculateMonthlyPayment();
    const monthlyIncome = loan.customer.monthlyIncome;
    const debtToIncomeRatio = monthlyPayment / monthlyIncome;

    if (debtToIncomeRatio > this.minDebtToIncomeRatio) {
      console.log(
        `[${this.name}] Debt-to-income ratio too high: ${(debtToIncomeRatio * 100).toFixed(1)}%`,
      )
      this.mediator.notify(this.name, 'CHECK_FAILED', loan);
      return false;
    }

    console.log(`[${this.name}] Credit check passed`);
    this.mediator.notify(this.name, 'CREDIT_CHECK_PASSED', loan);
    return true;
  }
}