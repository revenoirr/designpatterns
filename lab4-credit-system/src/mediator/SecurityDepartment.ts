import { Department, IBankMediator } from './BankMediator';
import { LoanApplication } from '../entities/LoanApplication';

export class SecurityDepartment extends Department {
  private blacklist: Set<string>;

  constructor(name: string, mediator: IBankMediator) {
    super(name, mediator);
    this.blacklist = new Set();
  }

  addToBlacklist(customerId: string): void {
    this.blacklist.add(customerId);
  }

  processLoan(loan: LoanApplication): boolean {
    console.log(`[${this.name}] Security check for loan ${loan.id}...`);

    if (this.blacklist.has(loan.customer.id)) {
      console.log(`[${this.name}] Customer is blacklisted`);
      this.mediator.notify(this.name, 'CHECK_FAILED', loan);
      return false;
    }

    const fraudScore = this.calculateFraudScore(loan);
    if (fraudScore > 0.7) {
      console.log(` [${this.name}] High fraud risk detected: ${(fraudScore * 100).toFixed(0)}%`);
      this.mediator.notify(this.name, 'CHECK_FAILED', loan);
      return false;
    }

    console.log(`[${this.name}] Security check passed`);
    this.mediator.notify(this.name, 'SECURITY_CHECK_PASSED', loan);
    return true;
  }

  private calculateFraudScore(loan: LoanApplication): number {
    let score = 0;

    if (loan.amount > loan.customer.monthlyIncome * 60) {
      score += 0.3;
    }

    if (loan.customer.creditScore < 600 && loan.amount > 50000) {
      score += 0.4;
    }

    if (loan.termMonths < 12 && loan.amount > 100000) {
      score += 0.3;
    }

    return Math.min(score, 1.0);
  }
}