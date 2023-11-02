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
      return this._http.post(this.ApiBaseUrl+'/patient/getAllCartItems',data)
    }
    addToCart(data:any) {
      return this._http.post(this.ApiBaseUrl+'/patient/addToCart',data)
    }
    
    updatePatient(data:any) {
      return this._http.post(this.ApiBaseUrl+'/patient/editCartItem',data)
    }
  
    deleteCart(data:any) {
      return this._http.post(this.ApiBaseUrl+'/patient/deleteCartItem',data)
    }
    

}
