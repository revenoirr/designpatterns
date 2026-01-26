// src/index.ts
import { Customer } from './entities/Customer';
import { CustomerService } from './services/CustomerService';
import { LoanApplicationService } from './services/LoanApplicationService';
import { NotificationService } from './services/NotificationService';

// Factories
import { MortgageLoanFactory } from './factories/MortgageLoanFactory';
import { ConsumerLoanFactory } from './factories/ConsumerLoanFactory';
import { AutoLoanFactory } from './factories/AutoLoanFactory';
import { BusinessLoanFactory } from './factories/BusinessLoanFactory';

// Decorators
import { InsuranceDecorator } from './decorators/InsuranceDecorator';
import { EarlyRepaymentDecorator } from './decorators/EarlyRepaymentDecorator';
import { GracePeriodDecorator } from './decorators/GracePeriodDecorator';
import { PriorityProcessingDecorator } from './decorators/PriorityProcessingDecorator';

// Mediator
import { BankMediator } from './mediator/BankMediator';
import { CreditDepartment } from './mediator/CreditDepartment';
import { SecurityDepartment } from './mediator/SecurityDepartment';
import { AccountingDepartment } from './mediator/AccountingDepartment';

import { LoanApplication } from './entities/LoanApplication';

function demonstrateLoanSystem() {
  console.log('\n🎯 DEMO: Bank Loan Processing System with Design Patterns\n');
  console.log('Patterns used: Factory Method, Decorator, Mediator\n');

  // ========================================
  // Инициализация сервисов
  // ========================================
  const customerService = new CustomerService();
  const loanService = new LoanApplicationService();
  const notificationService = new NotificationService();

  // ========================================
  // Инициализация Mediator и департаментов
  // ========================================
  const mediator = new BankMediator();
  const creditDepartment = new CreditDepartment('CREDIT', mediator);
  const securityDepartment = new SecurityDepartment('SECURITY', mediator);
  const accountingDepartment = new AccountingDepartment('ACCOUNTING', mediator, 10000000);

  mediator.registerDepartment('CREDIT', creditDepartment);
  mediator.registerDepartment('SECURITY', securityDepartment);
  mediator.registerDepartment('ACCOUNTING', accountingDepartment);

  console.log('🏦 Bank system initialized\n');

  // ========================================
  // Инициализация фабрик (Factory Method)
  // ========================================
  const mortgageFactory = new MortgageLoanFactory();
  const consumerFactory = new ConsumerLoanFactory();
  const autoFactory = new AutoLoanFactory();
  const businessFactory = new BusinessLoanFactory();

  // ========================================
  // Регистрация клиентов
  // ========================================
  const customer1 = new Customer('C001', 'John Smith', 'john@example.com', 720, 8000);
  const customer2 = new Customer('C002', 'Alice Johnson', 'alice@example.com', 650, 5500);
  const customer3 = new Customer('C003', 'Bob Williams', 'bob@example.com', 580, 4000);

  customerService.addCustomer(customer1);
  customerService.addCustomer(customer2);
  customerService.addCustomer(customer3);

  console.log(`✅ Customer registered: ${customer1.name}`);
  console.log(`✅ Customer registered: ${customer2.name}`);
  console.log(`✅ Customer registered: ${customer3.name}\n`);

  // ========================================
  // ПРИМЕР 1: Ипотечный кредит с декораторами
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('📋 EXAMPLE 1: MORTGAGE LOAN with Insurance + Priority');
  console.log('='.repeat(60) + '\n');

  // Factory Method - создание базовой заявки
  let mortgageLoan = mortgageFactory.processLoanApplication(
    customer1,
    300000,
    360,
    350000, // property value
    50000,  // down payment
  );

  // Decorator - добавление страховки
  console.log('🛡️  Adding insurance decorator...');
  mortgageLoan = new InsuranceDecorator(mortgageLoan);

  // Decorator - добавление приоритетной обработки
  console.log('⚡ Adding priority processing decorator...');
  mortgageLoan = new PriorityProcessingDecorator(mortgageLoan);

  // Добавление в сервис
  loanService.addApplication(mortgageLoan);

  // Вывод информации
  printLoanInfo(mortgageLoan);

  // Отправка уведомления
  notificationService.sendEmail(
    customer1,
    'Loan Application Received',
    `Your mortgage loan application ${mortgageLoan.id} has been received.`,
  );

  // Mediator - отправка на одобрение через департаменты
  console.log('\n🔄 Submitting for approval through departments...\n');
  mediator.notify('SYSTEM', 'APPLICATION_SUBMITTED', mortgageLoan);

  if (mortgageLoan.status === 'APPROVED') {
    notificationService.sendEmail(
      customer1,
      'Loan Approved!',
      `Congratulations! Your loan ${mortgageLoan.id} has been approved.`,
    );
  }

  // ========================================
  // ПРИМЕР 2: Потребительский кредит с льготным периодом
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('📋 EXAMPLE 2: CONSUMER LOAN with Grace Period + Early Repayment');
  console.log('='.repeat(60) + '\n');

  // Factory Method
  let consumerLoan = consumerFactory.processLoanApplication(
    customer2,
    15000,
    48,
    'Home renovation',
  );

  // Decorators
  console.log('⏸️  Adding grace period decorator (6 months)...');
  consumerLoan = new GracePeriodDecorator(consumerLoan, 6);

  console.log('⏩ Adding early repayment decorator...');
  consumerLoan = new EarlyRepaymentDecorator(consumerLoan);

  loanService.addApplication(consumerLoan);
  printLoanInfo(consumerLoan);

  notificationService.sendEmail(
    customer2,
    'Loan Application Received',
    `Your consumer loan application ${consumerLoan.id} has been received.`,
  );

  // Mediator
  console.log('\n🔄 Submitting for approval through departments...\n');
  mediator.notify('SYSTEM', 'APPLICATION_SUBMITTED', consumerLoan);

  if (consumerLoan.status === 'APPROVED') {
    notificationService.sendEmail(
      customer2,
      'Loan Approved!',
      `Congratulations! Your loan ${consumerLoan.id} has been approved.`,
    );
  }

  // ========================================
  // ПРИМЕР 3: Автокредит со страховкой
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('📋 EXAMPLE 3: AUTO LOAN with Insurance');
  console.log('='.repeat(60) + '\n');

  // Factory Method
  let autoLoan = autoFactory.processLoanApplication(
    customer2,
    25000,
    60,
    'Toyota',
    'Camry',
    2024,
  );

  // Decorator
  console.log('🛡️  Adding insurance decorator...');
  autoLoan = new InsuranceDecorator(autoLoan);

  loanService.addApplication(autoLoan);
  printLoanInfo(autoLoan);

  notificationService.sendEmail(
    customer2,
    'Loan Application Received',
    `Your auto loan application ${autoLoan.id} has been received.`,
  );

  // Mediator
  console.log('\n🔄 Submitting for approval through departments...\n');
  mediator.notify('SYSTEM', 'APPLICATION_SUBMITTED', autoLoan);

  if (autoLoan.status === 'APPROVED') {
    notificationService.sendEmail(
      customer2,
      'Loan Approved!',
      `Your loan ${autoLoan.id} has been approved.`,
    );
  }

  // ========================================
  // ПРИМЕР 4: Бизнес-кредит (будет отклонен)
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('📋 EXAMPLE 4: BUSINESS LOAN (will be rejected)');
  console.log('='.repeat(60) + '\n');

  // Factory Method
  let businessLoan = businessFactory.processLoanApplication(
    customer3,
    100000,
    120,
    'Tech Startup LLC',
    'Software Development',
    1,
  );

  // Decorators - добавляем все фичи
  console.log('🛡️  Adding insurance decorator...');
  businessLoan = new InsuranceDecorator(businessLoan);

  console.log('⏩ Adding early repayment decorator...');
  businessLoan = new EarlyRepaymentDecorator(businessLoan);

  console.log('⚡ Adding priority processing decorator...');
  businessLoan = new PriorityProcessingDecorator(businessLoan);

  loanService.addApplication(businessLoan);
  printLoanInfo(businessLoan);

  notificationService.sendEmail(
    customer3,
    'Loan Application Received',
    `Your business loan application ${businessLoan.id} has been received.`,
  );

  // Mediator
  console.log('\n🔄 Submitting for approval through departments...\n');
  mediator.notify('SYSTEM', 'APPLICATION_SUBMITTED', businessLoan);

  if (businessLoan.status === 'REJECTED') {
    notificationService.sendEmail(
      customer3,
      'Loan Application Update',
      `Unfortunately, your loan application ${businessLoan.id} was not approved at this time.`,
    );
  }

  // ========================================
  // Статистика
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('📊 BANK STATISTICS');
  console.log('='.repeat(60));
  console.log(`Total Customers: ${customerService.getAllCustomers().length}`);
  console.log(`Total Applications: ${loanService.getAllApplications().length}`);
  console.log(`Pending: ${loanService.getPendingApplications().length}`);
  console.log(`Approved: ${loanService.getApprovedApplications().length}`);
  console.log(`Rejected: ${loanService.getRejectedApplications().length}`);
  console.log(`Available Funds: $${accountingDepartment.getAvailableFunds().toLocaleString()}`);
  console.log(`Allocated Funds: $${accountingDepartment.getAllocatedFunds().toLocaleString()}`);
  console.log('='.repeat(60) + '\n');

  // ========================================
  // Заявки конкретного клиента
  // ========================================
  console.log(`📋 Customer "${customer2.name}" applications:`);
  const customer2Loans = loanService.getCustomerApplications(customer2.id);
  customer2Loans.forEach((loan) => {
    console.log(`   - ${loan.toString()}`);
  });
  console.log('');

  // ========================================
  // Демонстрация работы паттернов
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('🎓 DESIGN PATTERNS DEMONSTRATION');
  console.log('='.repeat(60));
  console.log('\n1️⃣  FACTORY METHOD:');
  console.log('   ✓ MortgageLoanFactory created mortgage loan');
  console.log('   ✓ ConsumerLoanFactory created consumer loan');
  console.log('   ✓ AutoLoanFactory created auto loan');
  console.log('   ✓ BusinessLoanFactory created business loan');
  console.log('   ✓ Each factory encapsulates loan creation logic\n');

  console.log('2️⃣  DECORATOR:');
  console.log('   ✓ InsuranceDecorator added insurance cost');
  console.log('   ✓ PriorityProcessingDecorator added priority fee');
  console.log('   ✓ GracePeriodDecorator modified payment schedule');
  console.log('   ✓ EarlyRepaymentDecorator added early repayment option');
  console.log('   ✓ Decorators can be stacked dynamically\n');

  console.log('3️⃣  MEDIATOR:');
  console.log('   ✓ BankMediator coordinates departments');
  console.log('   ✓ CreditDepartment checks creditworthiness');
  console.log('   ✓ SecurityDepartment performs fraud checks');
  console.log('   ✓ AccountingDepartment verifies funds');
  console.log('   ✓ Departments communicate only through mediator\n');

  console.log('='.repeat(60) + '\n');
}

// Вспомогательная функция для вывода информации о заявке
function printLoanInfo(loan: LoanApplication): void {
  console.log('\n📋 Loan Application Details:');
  console.log(`   ID: ${loan.id}`);
  console.log(`   Type: ${loan.getType()}`);
  console.log(`   Customer: ${loan.customer.name}`);
  console.log(`   Amount: $${loan.amount.toLocaleString()}`);
  console.log(`   Term: ${loan.termMonths} months`);
  console.log(`   Interest Rate: ${loan.interestRate}%`);
  console.log(`   Monthly Payment: $${loan.calculateMonthlyPayment().toLocaleString()}`);
  console.log(`   Total Payment: $${loan.calculateTotalPayment().toLocaleString()}`);
  console.log(`   Status: ${loan.status}`);
  console.log(`   Description: ${loan.getDescription()}`);
}

// Запуск демонстрации
demonstrateLoanSystem();