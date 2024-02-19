import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
declare var Razorpay: any;



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private razorpay: any;

  private subject = new BehaviorSubject<string>('');
  
  private ApiBaseUrl = environment.BaseApiUrl
  constructor(private _http: HttpClient) { 
    // this.razorpay = new Razorpay({
    //   key: 'FSChGkGq5ZHmMT'
    // });
  }


  signUp(data: any): Observable<any> {
    return this._http.post(this.ApiBaseUrl + '/user/webSignUp', data)
  }

  signIn(data: any): Observable<any> {
    return this._http.post(this.ApiBaseUrl + '/user/webSignIn', data)
  }

  isLoggedIn() {
    return localStorage.getItem('JWT_TOKEN') != null;
  };

  getToken() {
    return localStorage.getItem('JWT_TOKEN') || '';
  };

  sendQtyNumber(qty:string) {
    this.subject.next(qty)
  };

  receiveQtyNumer(): Observable<string> {
    return this.subject.asObservable();
  };


  // initiatePayment(amount: number) {
  //   const options = {
  //     amount: amount * 100, // Amount in paisa
  //     currency: 'INR',
  //     receipt: 'order_receipt',
  //     payment_capture: 1
  //   };

  //   this.razorpay.createPayment(options, (response: any) => {
  //     console.log(response);
  //   });
  // }
}
