import { Department, IBankMediator } from './BankMediator';
import { LoanApplication } from '../entities/LoanApplication';

export class AccountingDepartment extends Department {
  private availableFunds: number;
  private allocatedFunds: number;

  constructor(name: string, mediator: IBankMediator, initialFunds: number = 10000000) {
    super(name, mediator);
    this.availableFunds = initialFunds;
    this.allocatedFunds = 0;
  }

  processLoan(loan: LoanApplication): boolean {
    console.log(`[${this.name}] Financial check for loan ${loan.id}...`);

    if (loan.amount > this.availableFunds) {
      console.log(
        `[${this.name}] Insufficient funds. Available: $${this.availableFunds}, Requested: $${loan.amount}`,
      );
      this.mediator.notify(this.name, 'CHECK_FAILED', loan);
      return false;
    }

    const expectedProfit = loan.calculateTotalPayment() - loan.amount;
    const profitMargin = (expectedProfit / loan.amount) * 100;

    if (profitMargin < 5) {
      console.log(`[${this.name}] Profit margin too low: ${profitMargin.toFixed(2)}%`);
      this.mediator.notify(this.name, 'CHECK_FAILED', loan);
      return false;
    }

    this.allocateFunds(loan.amount);

    console.log(`[${this.name}] Financial check passed. Profit margin: ${profitMargin.toFixed(2)}%`);
    this.mediator.notify(this.name, 'ACCOUNTING_APPROVED', loan);
    return true;
  }

  private allocateFunds(amount: number): void {
    this.availableFunds -= amount;
    this.allocatedFunds += amount;
    console.log(`Funds allocated: $${amount}. Remaining: $${this.availableFunds}`);
  }

  releaseFunds(amount: number): void {
    this.availableFunds += amount;
    this.allocatedFunds -= amount;
    console.log(`Funds released: $${amount}. Available: $${this.availableFunds}`);
  }

  getAvailableFunds(): number {
    return this.availableFunds;
  }

  getAllocatedFunds(): number {
    return this.allocatedFunds;
  }
}