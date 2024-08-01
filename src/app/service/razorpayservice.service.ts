import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
declare var Razorpay: any;


@Injectable({
  providedIn: 'root'
})
export class RazorpayService {
  
  private razorpay: any;
  BasePathApi = environment.BaseLimsApiUrl

  constructor(private _http: HttpClient) {}

  openPayment(price: number, onSuccess: (response: any) => void, onError: (error: any) => void): void {
    const options = {
      key: 'rzp_test_gRrgr3AnPftiF4', // Replace with your Razorpay Key ID
      currency: 'INR',
      name: 'Nirnayan',
      description: 'Test Transaction',
      image: 'https://nirnayanhealthcare.com/assets/images/logo.png',
      theme: {
        color: '#21a318'
      },
      amount: price * 100, // Convert amount to smallest currency unit (like paisa for INR)
      prefill: {
        name: 'Arun Sarkar',
        email: 'arun.sarkar@nirnayan.com',
        contact: '7033025505'
      },
      handler: (response: any) => {
        onSuccess(response);
      },
      modal: {
        ondismiss: (error: any) => {
          onError(error);
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  private apiUrl = 'https://api.razorpay.com/v1/standard_checkout/payments/validate/account';
  private keyId = 'rzp_test_gRrgr3AnPftiF4';

  validateAccount(sessionToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.keyId
    });

    const body = {
      session_token: sessionToken
      // Add other required parameters as needed
    };

    return this._http.post<any>(this.apiUrl, body, { headers: headers });
  }


  storeCanceledPaymentHistory(data: any) {
    return this._http.post(this.BasePathApi + 'b2c/user/storeFailedPayments', data)
  }
}
