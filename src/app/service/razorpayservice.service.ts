import { Injectable } from '@angular/core';
declare var Razorpay: any;


@Injectable({
  providedIn: 'root'
})
export class RazorpayService {
  
  private razorpay: any;

  constructor() {
    this.initializeRazorpay();
  }

  private initializeRazorpay() {
    this.razorpay = new Razorpay({
      key: 'YOUR_RAZORPAY_KEY', // Replace with your actual Razorpay key
      amount: 50000, // Example amount (in paise)
      currency: 'INR',
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: 'order_9A33XWu170gUtm', // Replace with actual order_id obtained from server
      prefill: {
        name: 'Gaurav Kumar',
        email: 'arun.sarkar@nirnayan.com',
        contact: '7033025503'
      },
      theme: {
        color: '#3399cc'
      }
    });
  }

  initiatePayment() {
    this.razorpay.open();
  }

  handlePaymentResponse(response: any) {
    console.log('Payment Response:', response);
    // Handle payment success logic here
  }

  handleError(error: any) {
    console.error('Payment Error:', error);
    // Handle payment failure logic here
  }

  subscribeToPaymentEvents() {
    this.razorpay.on('payment.failed', (response: any) => {
      this.handleError(response.error);
    });

    this.razorpay.on('payment.success', (response: any) => {
      this.handlePaymentResponse(response);
    });
  }
}
