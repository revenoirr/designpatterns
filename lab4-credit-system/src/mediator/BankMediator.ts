import { LoanApplication, LoanStatus } from '../entities/LoanApplication';

export interface IBankMediator {
  registerDepartment(name: string, department: Department): void;
  notify(sender: string, event: string, loan: LoanApplication): void;
}

export abstract class Department {
  protected mediator: IBankMediator;
  protected name: string;

  constructor(name: string, mediator: IBankMediator) {
    this.name = name;
    this.mediator = mediator;
  }

  abstract processLoan(loan: LoanApplication): boolean;
}

export class BankMediator implements IBankMediator {
  private departments: Map<string, Department>;
  private processingQueue: LoanApplication[];

  constructor() {
    this.departments = new Map();
    this.processingQueue = [];
  }

  registerDepartment(name: string, department: Department): void {
    this.departments.set(name, department);
    console.log(`📋 Department registered: ${name}`);
  }

  notify(sender: string, event: string, loan: LoanApplication): void {
    console.log(` Event from ${sender}: ${event} for loan ${loan.id}`);

    if (event === 'APPLICATION_SUBMITTED') {
      this.processApplication(loan);
    } else if (event === 'CREDIT_CHECK_PASSED') {
      this.proceedToSecurity(loan);
    } else if (event === 'SECURITY_CHECK_PASSED') {
      this.proceedToAccounting(loan);
    } else if (event === 'ACCOUNTING_APPROVED') {
      this.approveLoan(loan);
    } else if (event === 'CHECK_FAILED') {
      this.rejectLoan(loan, sender);
    }
  }

  private processApplication(loan: LoanApplication): void {
    this.processingQueue.push(loan);
    loan.setStatus(LoanStatus.PROCESSING);
    
    const creditDept = this.departments.get('CREDIT');
    if (creditDept) {
      console.log(' Forwarding to Credit Department...');
      creditDept.processLoan(loan);
    }
  }

  private proceedToSecurity(loan: LoanApplication): void {
    const securityDept = this.departments.get('SECURITY');
    if (securityDept) {
      console.log(' Forwarding to Security Department...');
      securityDept.processLoan(loan);
    }
  }

  private proceedToAccounting(loan: LoanApplication): void {
    const accountingDept = this.departments.get('ACCOUNTING');
    if (accountingDept) {
      console.log(' Forwarding to Accounting Department...');
      accountingDept.processLoan(loan);
    }
  }

  private approveLoan(loan: LoanApplication): void {
    loan.setStatus(LoanStatus.APPROVED);
    console.log(`Loan ${loan.id} APPROVED!`);
    this.removeFromQueue(loan);
  }

  private rejectLoan(loan: LoanApplication, reason: string): void {
    loan.setStatus(LoanStatus.REJECTED);
    console.log(`Loan ${loan.id} REJECTED by ${reason}`);
    this.removeFromQueue(loan);
  }

  private removeFromQueue(loan: LoanApplication): void {
    const index = this.processingQueue.indexOf(loan);
    if (index > -1) {
      this.processingQueue.splice(index, 1);
    }
  }

  getProcessingQueue(): LoanApplication[] {
    return [...this.processingQueue];
  }
}