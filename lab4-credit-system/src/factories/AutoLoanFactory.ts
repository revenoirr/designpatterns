import { LoanFactory } from './LoanFactory';
import { LoanApplication } from '../entities/LoanApplication';
import { Customer } from '../entities/Customer';
import { AutoLoan } from '../loans/AutoLoan';

export class AutoLoanFactory extends LoanFactory {
  private readonly baseInterestRate = 5.5;

  createLoan(
    customer: Customer,
    amount: number,
    termMonths: number,
    vehicleMake?: string,
    vehicleModel?: string,
    vehicleYear?: number,
  ): LoanApplication {
    let interestRate = this.baseInterestRate;

    if (customer.creditScore < 650) {
      interestRate += 2.5;
    } else if (customer.creditScore < 700) {
      interestRate += 1.25;
    }

    const currentYear = new Date().getFullYear();
    const year = vehicleYear || currentYear;

    if (currentYear - year > 5) {
      interestRate += 1;
    }

    return new AutoLoan(
      this.generateId('AUTO'),
      customer,
      amount,
      termMonths,
      interestRate,
      vehicleMake || 'Unknown',
      vehicleModel || 'Unknown',
      year,
      amount * 1.1,
    );
  }

  processLoanApplication(
    customer: Customer,
    amount: number,
    termMonths: number,
    vehicleMake: string,
    vehicleModel: string,
    vehicleYear: number,
  ): LoanApplication {
    console.log(`Creating auto loan application for ${customer.name}...`);

    const loan = this.createLoan(
      customer,
      amount,
      termMonths,
      vehicleMake,
      vehicleModel,
      vehicleYear,
    );

    console.log(`${loan.getType()} loan created: ${loan.id}`);

    return loan;
  }
}