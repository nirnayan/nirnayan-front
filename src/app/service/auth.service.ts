import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private razorpay: any;
  private subject = new BehaviorSubject<string>('');
  private BesLimsPath = environment.BaseLimsApiUrl;
  private ApiBaseUrl = environment.BaseApiUrl;

  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize Razorpay only on the client-side
      this.razorpay = new Razorpay({
        key: 'FSChGkGq5ZHmMT'
      });
    }
  }

  register(data: any): Observable<any> {
    return this._http.post(this.BesLimsPath + 'b2c/webSignUp', data);
  }

  signUp(data: any): Observable<any> {
    return this._http.post(this.ApiBaseUrl + '/webSignUp', data);
  }

  signIn(data: any): Observable<any> {
    return this._http.post(this.ApiBaseUrl + '/webSignIn', data);
  }

  requestSignUpOtp(data:any):Observable<any>{
    return this._http.post(this.ApiBaseUrl + 'requestSignUpOTP' , data)
  }

  verifySignUpOTP(data:any):Observable<any>{
    return this._http.post(this.ApiBaseUrl + 'verifySignUpOTP' , data)
  }

  isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('JWT_TOKEN') != null : false;
  }

  getToken(): string {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('JWT_TOKEN') || '' : '';
  }

  sendQtyNumber(qty: any): void {
    this.subject.next(qty);
  }

  receiveQtyNumer(): Observable<any> {
    return this.subject.asObservable();
  }

  // Initiate payment only in the browser
  initiatePayment(amount: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const options = {
        amount: amount * 100, // Amount in paisa
        currency: 'INR',
        receipt: 'order_receipt',
        payment_capture: 1
      };

      this.razorpay.open(options);
    }
  }
}
