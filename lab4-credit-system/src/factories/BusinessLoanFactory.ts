import { LoanFactory } from './LoanFactory';
import { LoanApplication } from '../entities/LoanApplication';
import { Customer } from '../entities/Customer';
import { BusinessLoan } from '../loans/BusinessLoan';

export class BusinessLoanFactory extends LoanFactory {
  private readonly baseInterestRate = 6.5;

  createLoan(
    customer: Customer,
    amount: number,
    termMonths: number,
    businessName?: string,
    businessType?: string,
    yearsInBusiness?: number,
  ): LoanApplication {
    let interestRate = this.baseInterestRate;

    if (customer.creditScore < 680) {
      interestRate += 2;
    }

    const years = yearsInBusiness || 0;

    if (years > 10) {
      interestRate -= 0.5;
    } else if (years < 2) {
      interestRate += 1.5;
    }

    return new BusinessLoan(
      this.generateId('BIZ'),
      customer,
      amount,
      termMonths,
      interestRate,
      businessName || 'Unknown Business',
      businessType || 'General',
      years,
    );
  }

  processLoanApplication(
    customer: Customer,
    amount: number,
    termMonths: number,
    businessName: string,
    businessType: string,
    yearsInBusiness: number,
  ): LoanApplication {
    console.log(`Creating business loan application for ${customer.name}...`);

    const loan = this.createLoan(
      customer,
      amount,
      termMonths,
      businessName,
      businessType,
      yearsInBusiness,
    );

    console.log(`${loan.getType()} loan created: ${loan.id}`);

    return loan;
  }
}