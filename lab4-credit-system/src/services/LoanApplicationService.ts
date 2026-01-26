import { LoanApplication } from '../entities/LoanApplication';

export class LoanApplicationService {
  private applications: Map<string, LoanApplication>;

  constructor() {
    this.applications = new Map();
  }

  addApplication(application: LoanApplication): void {
    this.applications.set(application.id, application);
  }

  getApplicationById(id: string): LoanApplication | undefined {
    return this.applications.get(id);
  }

  getAllApplications(): LoanApplication[] {
    return Array.from(this.applications.values());
  }

  getPendingApplications(): LoanApplication[] {
    return this.getAllApplications().filter((app) => app.status === 'PENDING');
  }

  getApprovedApplications(): LoanApplication[] {
    return this.getAllApplications().filter((app) => app.status === 'APPROVED');
  }

  getRejectedApplications(): LoanApplication[] {
    return this.getAllApplications().filter((app) => app.status === 'REJECTED');
  }

  getCustomerApplications(customerId: string): LoanApplication[] {
    return this.getAllApplications().filter((app) => app.customer.id === customerId);
  }
}