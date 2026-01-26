import { LoanFactory } from './LoanFactory';
import { LoanApplication } from '../entities/LoanApplication';
import { Customer } from '../entities/Customer';
import { ConsumerLoan } from '../loans/ConsumerLoan';

export class ConsumerLoanFactory extends LoanFactory {
  private readonly baseInterestRate = 8.5;

  createLoan(
    customer: Customer,
    amount: number,
    termMonths: number,
    purpose?: string,
  ): LoanApplication {
    let interestRate = this.baseInterestRate;

    if (customer.creditScore < 600) {
      interestRate += 4;
    } else if (customer.creditScore < 700) {
      interestRate += 2;
    }

    return new ConsumerLoan(
      this.generateId('CNS'),
      customer,
      amount,
      termMonths,
      interestRate,
      purpose || 'General purpose',
    );
  }

  processLoanApplication(
    customer: Customer,
    amount: number,
    termMonths: number,
    purpose: string = 'General purpose',
  ): LoanApplication {
    console.log(`Creating consumer loan application for ${customer.name}...`);

    const loan = this.createLoan(customer, amount, termMonths, purpose);

    console.log(`${loan.getType()} loan created: ${loan.id}`);

    return loan;
  }
}