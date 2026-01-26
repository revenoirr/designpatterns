import { LoanFactory } from './LoanFactory';
import { LoanApplication } from '../entities/LoanApplication';
import { Customer } from '../entities/Customer';
import { MortgageLoan } from '../loans/MortgageLoan';

export class MortgageLoanFactory extends LoanFactory {
  private readonly baseInterestRate = 3.5;

  createLoan(
    customer: Customer,
    amount: number,
    termMonths: number,
    propertyValue?: number,
    downPayment?: number,
  ): LoanApplication {
    const propValue = propertyValue || amount * 1.2;
    const down = downPayment || amount * 0.2;

    let interestRate = this.baseInterestRate;

    if (customer.creditScore < 650) {
      interestRate += 1.5;
    } else if (customer.creditScore < 700) {
      interestRate += 0.75;
    }

    return new MortgageLoan(
      this.generateId('MTG'),
      customer,
      amount,
      termMonths,
      interestRate,
      propValue,
      down,
    );
  }

  processLoanApplication(
    customer: Customer,
    amount: number,
    termMonths: number,
    propertyValue: number,
    downPayment: number,
  ): LoanApplication {
    console.log(`🏭 Creating mortgage loan application for ${customer.name}...`);

    const loan = this.createLoan(customer, amount, termMonths, propertyValue, downPayment);

    console.log(`✅ ${loan.getType()} loan created: ${loan.id}`);

    return loan;
  }
}