export class PaymentService {

  processPayment(amount: number, cardNumber: string): boolean {
    console.log(`Processing payment of $${amount.toFixed(2)} with card ${cardNumber}`);

    if (cardNumber.length >= 16) {
      console.log('Payment successful');
      return true;
    }

    console.log('Payment failed: invalid card number');
    return false;
  }

  refundPayment(amount: number): boolean {
    console.log(`Refunding $${amount.toFixed(2)}`);
    return true;
  }
}
