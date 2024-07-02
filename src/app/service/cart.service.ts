import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
declare var Razorpay: any;


@Injectable({
  providedIn: 'root'
})
export class CartService {
  searchsubject = new Subject()
  public productList = new BehaviorSubject<any>([]);
  public cartItemList: any = [];
  ApiBaseUrl = environment.BaseApiUrl
  BasePathApi = environment.BaseLimsApiUrl

  private razorpay: any;

  constructor(private _http: HttpClient) { this.initializeRazorpay()}


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

  private initializeRazorpay() {
    let firstName = localStorage.getItem('USER_NAME_FIRST');
    let lastName = localStorage.getItem('USER_NAME_LAST');
    let userEmail = localStorage.getItem('USER_EMAIL');
    let userMobile = localStorage.getItem('USER_MOBILE');
    this.razorpay = new Razorpay({
      key: 'rzp_test_gRrgr3AnPftiF4', // Replace with your actual Razorpay key
      prefill: {
        name: `${firstName +' '+ lastName}`,
        email: userEmail,
        contact: userMobile
      },
      theme: {
        color: '#3399cc'
      }
    });
  }

  initiatePayment(order_id: string,amount:any) {
    this.razorpay.open({
      amount: amount, // Example amount (in paise)
      currency: 'INR',
      name: 'Nirnayan Healthcare Private Limited',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: order_id,
      handler: (response: any) => {
        console.log('Payment Response:', response);
        // Handle payment success logic here
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed');
          // Handle payment dismissed logic here
        }
      }
    });
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
