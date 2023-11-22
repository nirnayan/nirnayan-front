import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  searchsubject = new Subject()
  public productList = new BehaviorSubject<any>([]);
  public cartItemList : any = [];
  ApiBaseUrl = environment.BaseApiUrl

  constructor(private _http: HttpClient) { }


    // Cart
    cartItem:any
    getCartList(data:any) {
      return this._http.post(this.ApiBaseUrl+'/user/getAllCartItems',data)
    }
    addToCart(data:any) {
      return this._http.post(this.ApiBaseUrl+'/user/addToCart',data)
    }
    
    updatePatient(data:any) {
      return this._http.post(this.ApiBaseUrl+'/user/editCartItem',data)
    }
  
    deleteCart(data:any) {
      return this._http.post(this.ApiBaseUrl+'/user/deleteCartItem',data)
    }

    moveTocheckout(data:any) {
      return this._http.post(this.ApiBaseUrl+'/user/moveToCheckout',data)
    }

    getcheckoutItems(data:any) {
      return this._http.post(this.ApiBaseUrl+'/user/getCheckoutPageData',data)
    }
    

}
