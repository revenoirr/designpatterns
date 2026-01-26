import { LoanDecorator } from './LoanDecorator';
import { LoanApplication } from '../entities/LoanApplication';

export class PriorityProcessingDecorator extends LoanDecorator {
  private readonly priorityFee = 1000;
  private readonly processingTimeDays = 2;

  constructor(loan: LoanApplication) {
    super(loan);
  }

  getFeatureName(): string {
    return `Priority Processing (${this.processingTimeDays} days)`;
  }

  getAdditionalCost(): number {
    return this.priorityFee;
  }

  calculateTotalPayment(): number {
    return this.wrappedLoan.calculateTotalPayment() + this.getAdditionalCost();
  }

  getDescription(): string {
    return `${this.wrappedLoan.getDescription()} + Priority Processing ($${this.priorityFee})`;
  }

  getProcessingTime(): number {
    return this.processingTimeDays;
  }

  isPriority(): boolean {
    return true;
  }
}