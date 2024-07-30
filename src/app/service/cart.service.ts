import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  searchsubject = new Subject()
  public productList = new BehaviorSubject<any>([]);
  public cartItemList: any = [];
  ApiBaseUrl = environment.BaseApiUrl
  BasePathApi = environment.BaseLimsApiUrl


  constructor(private _http: HttpClient) { }


  // Cart
  cartItem: any
  getCartList(data: any):Observable<any> {
    return this._http.post(this.ApiBaseUrl + '/user/getAllCartItems', data)
  }
  addToCart(data: any): Observable<any> {
    return this._http.post(this.ApiBaseUrl + '/user/addToCart', data)
  }

  updatePatient(data: any) {
    return this._http.post(this.ApiBaseUrl + '/user/editCartItem', data)
  }

  deleteCart(data: any) {
    return this._http.post(this.ApiBaseUrl + '/user/deleteCartItem', data)
  }

  moveTocheckout(data: any) {
    return this._http.post(this.ApiBaseUrl + '/user/moveToCheckout', data)
  }

  getcheckoutItems(data: any) {
    return this._http.post(this.ApiBaseUrl + '/user/getCheckoutPageData', data)
  }
  saveDoctorName(data: any) {
    return this._http.post(this.ApiBaseUrl + '/user/updateDoctorName', data)
  }

  storePrescription(data: any) {
    return this._http.post(this.ApiBaseUrl + '/user/uploadPrescription', data)
  }

  saveBooking(data: any) {
    return this._http.post(this.ApiBaseUrl + 'user/saveTestBooking', data)
  }

  getCoupons(data: any) {
    return this._http.post(this.ApiBaseUrl + '/getAllCoupons', data)
  }
  checkoutClear(data: any) {
    return this._http.post(this.ApiBaseUrl + 'user/clearCheckout', data)
  }

  cartClear(data: any) {
    return this._http.post(this.ApiBaseUrl + '/user/clearCart', data)
  }

  checkCheckoutItem(data: any) {
    return this._http.post(this.ApiBaseUrl + '/user/isCheckoutEmpty', data)
  }

  getAllSlot(data: any) {
    return this._http.post(this.ApiBaseUrl + '/slot/getAllSlots', data)
  }

  // Method to fetch data from the API
  getHomePageTest(state: number) {
    const apiUrl = this.BasePathApi+`/global/getHomePageTests?state=${state}&type=test`;
    return this._http.get(apiUrl);
  }



}
