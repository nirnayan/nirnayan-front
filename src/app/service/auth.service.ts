import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject = new BehaviorSubject<string>('');
  
  private ApiBaseUrl = environment.BaseApiUrl
  constructor(private _http: HttpClient) { }


  signUp(data: any): Observable<any> {
    return this._http.post(this.ApiBaseUrl + '/patient/webSignUp', data)
  }

  signIn(data: any): Observable<any> {
    return this._http.post(this.ApiBaseUrl + '/patient/webSignIn', data)
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
}
