import { Customer } from '../entities/Customer';

export class CustomerService {
  private customers: Map<string, Customer>;

  constructor() {
    this.customers = new Map();
  }

  addCustomer(customer: Customer): void {
    this.customers.set(customer.id, customer);
  }

  getCustomerById(id: string): Customer | undefined {
    return this.customers.get(id);
  }

  getAllCustomers(): Customer[] {
    return Array.from(this.customers.values());
  }
}