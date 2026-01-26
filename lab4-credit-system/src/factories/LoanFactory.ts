import { LoanApplication } from '../entities/LoanApplication';
import { Customer } from '../entities/Customer';

export abstract class LoanFactory {
  private static counter = 1;

  protected generateId(prefix: string): string {
    const id = `${prefix}${LoanFactory.counter.toString().padStart(5, '0')}`;
    LoanFactory.counter += 1;
    return id;
  }


  abstract createLoan(
    customer: Customer,
    amount: number,
    termMonths: number,
    ...additionalParams: unknown[]
  ): LoanApplication;
}