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
  private BesLimsPath = environment.BaseLimsApiUrl
  private ApiBaseUrl = environment.BaseApiUrl
  constructor(private _http: HttpClient) { 
    // this.razorpay = new Razorpay({
    //   key: 'FSChGkGq5ZHmMT'
    // });
  }

  register(data: any): Observable<any> {
    return this._http.post(this.BesLimsPath + 'b2c/webSignUp', data)
  }
  signUp(data: any): Observable<any> {
    return this._http.post(this.ApiBaseUrl + '/webSignUp', data)
  }

  signIn(data: any): Observable<any> {
    return this._http.post(this.ApiBaseUrl + '/webSignIn', data)
  }

  isLoggedIn() {
    return localStorage.getItem('JWT_TOKEN') != null;
  };

  getToken() {
    return localStorage.getItem('JWT_TOKEN') || '';
  };

  sendQtyNumber(qty:any) {
    this.subject.next(qty)
  };

  receiveQtyNumer(): Observable<any> {
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
