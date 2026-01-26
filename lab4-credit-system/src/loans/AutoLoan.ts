import { LoanApplication } from '../entities/LoanApplication';
import { Customer } from '../entities/Customer';

export class AutoLoan extends LoanApplication {
  private readonly _vehicleMake: string;
  private readonly _vehicleModel: string;
  private readonly _vehicleYear: number;
  private readonly _vehiclePrice: number;

  constructor(
    id: string,
    customer: Customer,
    amount: number,
    termMonths: number,
    interestRate: number,
    vehicleMake: string,
    vehicleModel: string,
    vehicleYear: number,
    vehiclePrice: number,
  ) {
    super(id, customer, amount, termMonths, interestRate);
    this._vehicleMake = vehicleMake;
    this._vehicleModel = vehicleModel;
    this._vehicleYear = vehicleYear;
    this._vehiclePrice = vehiclePrice;
  }

  get vehicleMake(): string {
    return this._vehicleMake;
  }

  get vehicleModel(): string {
    return this._vehicleModel;
  }

  get vehicleYear(): number {
    return this._vehicleYear;
  }

  get vehiclePrice(): number {
    return this._vehiclePrice;
  }

  getType(): string {
    return 'AUTO';
  }

  getDescription(): string {
    return `Auto loan for ${this._vehicleYear} ${this._vehicleMake} ${this._vehicleModel}`;
  }
}