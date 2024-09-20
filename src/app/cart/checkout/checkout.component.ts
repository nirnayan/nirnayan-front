import { Component, ElementRef, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { ProfileService } from '../../service/profile.service';
import Swal from 'sweetalert2';
import { RazorpayService } from '../../service/razorpayservice.service';
import { isPlatformBrowser } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Loader } from '@googlemaps/js-api-loader';
import { DirectionsService } from '../../service/directions.service';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('addressModal') myModal: ElementRef;
  allItems: any = []
  totalPrice: any
  discount: any = 0
  grossPrice: any
  addr_id: any = null
  myCoins: any
  coupons: any = []
  slotId: any = null
  bookingDate: any = null
  isDate: boolean = false
  activeCoupon: any = null;
  mycoins: any = 0
  restcoins: any = 0
  aftercoinsMrp: any = 0

  isLandmarkName: any
  addrId: any
  addressItems: any = []
  isEdit: boolean = false
  submitted: boolean = false
  isLandmark: boolean = false
  latitude!: number;
  longitude!: number;
  totalcoins: any = 0
  code: any;
  filteredCoupons: any;
  coupon_id: any;
  searchText: any
  order_id: string;
  isBrowser: boolean;
  userId: string;

  center: google.maps.LatLngLiteral = { lat: 22.9868, lng: 87.8550 };
  zoom = 8;

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('mapContainer2', { static: false }) mapContainer2!: ElementRef;

  map!: google.maps.Map;
  marker!: google.maps.Marker;


  directionsRenderer!: google.maps.DirectionsRenderer;
  directionsService1!: google.maps.DirectionsService;

  constructor(
    private _cart: CartService,
    private _router: Router,
    private _profile: ProfileService,
    private razorPayService: RazorpayService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private uiLoader:NgxUiLoaderService,
    private directionsService: DirectionsService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.fetchOrderIdFromBackend();
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.uiLoader.start()
      this.hideElements();
      this.setDatepickerMinDate();
      this.getAllAddress();
      this.getCheckOut();
      this.uiLoader.stop()
    }
  }
  
  getUserId(): string | null {
    if (this.isBrowser) {
      // For client-side, we can directly access localStorage
      return localStorage.getItem('USER_ID');
    } else {
      // For server-side, we return the stored userId or a fallback value
      return this.userId || 'server-side-user';
    }
  }

  getLocationId(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('LOCATION_ID');
    } else {
      // You might want to handle this differently for server-side rendering
      // Maybe fetch from a service or use a default value
      return null;
    }
  }

  private hideElements(): void {
    const loader = document.getElementById("loader");
    const alert = document.getElementById("alert");
    if (loader) loader.style.display = "none";
    if (alert) alert.style.display = "none";
  }

  private setDatepickerMinDate(): void {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const datepicker = document.getElementById('datepicker') as HTMLInputElement;
    if (datepicker) datepicker.min = minDate;
  }

  getCheckOut() {
    this.uiLoader.start()
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": this.getUserId(),
      "location_id": this.getLocationId()
    }
    this._cart.getcheckoutItems(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.uiLoader.stop()
        if (this.isBrowser) {
          const loader = document.getElementById("loader");
          if (loader) loader.style.display = "none";
        }
        this.allItems = res.data;
        this.totalPrice = this.allItems.totalAmount;
        this.grossPrice = this.allItems.totalAmount;
      } else if (res.status == 403 || res.status == 503) {
        if (this.isBrowser) {
          const alert = document.getElementById("alert");
          if (alert) alert.style.display = "block";
        }
      }
    });

    this.getAllCoins();
  }

  uploadPres(event: any, i: any) {
    let items = this.allItems.bookings.patientDetails;
    let patientId: any;
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (index == i) {
        patientId = element.patient_id;
      }
    }

    const formData = new FormData();
    formData.append('schemaName', 'nir1691144565');
    formData.append('booking_id', this.allItems.bookings.booking_id);
    formData.append('patient_id', patientId);
    formData.append('prescription', event.target.files[0]);
    this._cart.storePrescription(formData).subscribe((res: any) => {
      if (res.status == 1) {
        this.ngOnInit();
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Uploaded successfully !",
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
  }

  saveDoctor(doctor: any, id: any) {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": this.getUserId(),
      "patient_id": id,
      "doctor_name": doctor
    }
    this._cart.saveDoctorName(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.ngOnInit();
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Doctor added successfully !",
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
  }

  getAllCoins() {
    this.uiLoader.start()
    let payload = {
      "schemaName": "nir1691144565",
      "userID": this.getUserId()
    }
    this._profile.getCoins(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.uiLoader.stop()
        this.myCoins = res.data;
        this.totalcoins = res.data.balance;
      }
    });
    this.getMyCoupons();
  }

  slotItems: any = []
  getMyCoupons() {
    this.uiLoader.start()
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": this.getUserId()
    }
    this._cart.getCoupons(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.uiLoader.stop()
        this.coupons = res.data;
        this.filteredCoupons = this.coupons;
      }
    });

    let slotPayload = {
      "schemaName": "nir1691144565",
    }
    this._cart.getAllSlot(slotPayload).subscribe((res: any) => {
      if (res.status == 1) {
        this.slotItems = res.data.filter((element: any) => element.status == 1);
      }
    });
  }

  filterCoupons(searchValue: string) {
    this.searchText = searchValue;
  }

  getCouponDiscount(mycoupon: any) {
    this.applyCoupon('', mycoupon, '');
  }

  couponId: any = null;
  applyCoupon(code: any, coupon: any, couponid: any) {
    let couponItem = coupon || this.coupons.find(c => c.couponCode === code);
    if (couponItem) {
      if (this.isBrowser) {
        const couponCodeInput = document.getElementById('couponCode') as HTMLInputElement;
        const applyBtn = document.getElementById('applybtn') as HTMLInputElement;
        if (couponCodeInput) couponCodeInput.value = couponItem.couponCode;
        if (applyBtn) applyBtn.value = 'Applied';
      }
      this.activeCoupon = couponItem;
      this.couponId = couponid;
      if (couponItem.benefits && couponItem.benefits.discount) {
        if (couponItem.benefits.discount.discount_type == 2) {
          let discountAmt = couponItem.benefits.discount.discount_percent;
          let booking_amount = this.allItems.totalAmount;
          let data = (Number(discountAmt) / 100) * booking_amount;
          this.discount = data;
          this.totalPrice = booking_amount - data;
        } else {
          let discountAmt = couponItem.benefits.discount.max_discount_amount;
          this.discount = discountAmt;
          let booking_amount = this.allItems.totalAmount;
          this.totalPrice = booking_amount - Number(discountAmt);
        }
      }
    } else {
      console.log("Coupon not found.");
    }
  }

  removeCoupon() {
    if (this.activeCoupon) {
      this.couponId = null;
      this.discount = 0;
      this.totalPrice = this.allItems.totalAmount;
      this.activeCoupon = null;
      if (this.isBrowser) {
        const couponCodeInput = document.getElementById('couponCode') as HTMLInputElement;
        const applyBtn = document.getElementById('applybtn') as HTMLInputElement;
        if (couponCodeInput) couponCodeInput.value = '';
        if (applyBtn) applyBtn.value = 'Apply';
      }
    }
  }

  isCouponActive(coupon: any): boolean {
    this.coupon_id = coupon.couponId;
    return this.activeCoupon && this.activeCoupon.couponCode === coupon.couponCode;
  }

  addressCheck(addrId: any) {
    this.addr_id = addrId;
  }

  usedCoins: any = 0;
  async isCoinsUse(event: any, coins: any) {
    const toIndianCurrency = (num: any) => {
      return num.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR'
      });
    };

    let amount = await this.totalPrice;
    let amount2 = await this.totalPrice;
    let coinsValue: any;
    if (event.target.checked == true && coins > 0) {
      if (coins >= amount) {
        let remain = coins - amount;
        this.restcoins = remain;
        let totalremain = coins - remain;
        this.mycoins = amount;
        coinsValue = amount - totalremain;
        this.usedCoins = totalremain;
      } else {
        this.mycoins = amount - coins;
        coinsValue = amount - coins;
        this.usedCoins = coins;
        this.restcoins = 0;
      }
      if (this.isBrowser) {
        const restcoinsElement = document.getElementById('restcoins');
        const payElement = document.getElementById('pay');
        if (restcoinsElement) restcoinsElement.innerHTML = this.restcoins.toString();
        if (payElement) payElement.innerHTML = `Pay ${toIndianCurrency(coinsValue)}`;
      }
    } else {
      if (coins >= amount) {
        this.mycoins = 0;
        coinsValue = amount2;
        this.usedCoins = 0;
      } else {
        coinsValue = amount2;
        this.mycoins = coins;
        this.restcoins = coins;
        this.usedCoins = 0;
      }
      if (this.isBrowser) {
        const restcoinsElement = document.getElementById('restcoins');
        const payElement = document.getElementById('pay');
        if (restcoinsElement) restcoinsElement.innerHTML = this.totalcoins.toString();
        if (payElement) payElement.innerHTML = `Pay ${toIndianCurrency(coinsValue)}`;
      }
    }

    this.aftercoinsMrp = coinsValue;
  }

  getSlot(id: any) {
    this.slotId = id;
  }

  selectBookingDate(event: any) {
    this.bookingDate = event.target.value;
    this.isDate = !!this.bookingDate;
  }

  fetchOrderIdFromBackend() {
    this.order_id = 'ORD974953HHHG';
  }

  // Utility function for showing error messages
private showError(title: string, text: string): void {
  Swal.fire({ icon: "error", title, text });
}

// Validate form data
private validateForm(): boolean {
  if (!this.bookingDate && this.allItems.booking?.some(item => !item.doctorName)) {
    this.showError("Sorry", "Please choose your Booking slot!");
    return false;
  }
  if (!this.addr_id) {
    this.showError("Address Missing", "Please provide your address.");
    return false;
  }
  if (!this.bookingDate) {
    this.showError("Booking Date Missing", "Please choose your booking date.");
    return false;
  }
  if (!this.slotId) {
    this.showError("Slot Missing", "Please choose your booking slot.");
    return false;
  }
  return true;
}


createPayload() {
    // if (this.bookingDate == null && this.allItems.booking && this.allItems.booking.length > 0 && this.allItems.booking.filter(obj => obj.doctorName == null).length > 0) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Sorry",
    //     text: "Please choose your Booking slot!",
    //   });
    //   return;
    // }
    // if (!this.addr_id) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Address Missing",
    //     text: "Please provide your address.",
    //   });
    //   return;
    // }
    // if (!this.bookingDate) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Booking Date Missing",
    //     text: "Please choose your booking date.",
    //   });
    //   return;
    // }
    // if (!this.slotId) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Slot Missing",
    //     text: "Please choose your booking slot.",
    //   });
    //   return;
    // }

    // let price = this.aftercoinsMrp == 0 ? this.totalPrice : this.aftercoinsMrp;
    // let payload = {
    //   "user_id": this.getUserId(),
    //   "gross_amount": this.grossPrice,
    //   "discount_amount": this.discount,
    //   "received_amount": price,
    //   "paymentStatus": 1,
    //   "paymentDetails": '',
    //   "coins": this.usedCoins,
    //   "coupon_id": this.couponId,
    //   "address_id": this.addr_id,
    //   "patientDetails": JSON.stringify(this.allItems.bookings),
    //   "slot_date": this.bookingDate,
    //   "slot_id": this.slotId,
    //   "voucher_id": null
    // };
    // this.razorPayService.openPayment(
    //   price,
    //   (response: any) => {
    //     console.log('Payment success', response);
    //     this.paymentCallback(response, payload);
    //   },
    //   (error: any) => {
    //     console.log('Payment failed', error);
    //     this.paymentError(error, payload);
    //   }
    // );

    const price = this.aftercoinsMrp || this.totalPrice;
    return {
      user_id: this.getUserId(),
      gross_amount: this.grossPrice,
      discount_amount: this.discount,
      received_amount: price,
      paymentStatus: 1,
      paymentDetails: '',
      coins: this.usedCoins,
      coupon_id: this.couponId,
      address_id: this.addr_id,
      patientDetails: JSON.stringify(this.allItems.bookings),
      slot_date: this.bookingDate,
      slot_id: this.slotId,
      voucher_id: null
    };
  }
 
   payNow(): void {
    if (!this.validateForm()) return;
  
    const payload = this.createPayload();
    this.razorPayService.openPayment(
      payload.received_amount,
      (response: any) => {
        console.log('Payment success', response);
        this.paymentCallback(response, payload);
      },
      (error: any) => {
        console.log('Payment failed', error);
        this.paymentError(error, payload);
      }
    );
  }
  
  paymentCallback(response: any, payload: any): void {
    // payload.paymentDetails = {
    //   payment_id: response.razorpay_payment_id,
    //   status: response.status,
    //   created_at: response.created_at
    // };
    let dd = {order_id:response.razorpay_payment_id,status:'Recived'}
    payload.paymentDetails = JSON.stringify(dd)
    // payload.paymentDetails = JSON.stringify(payload.paymentDetails);
    console.log('Payment done', payload, response);
    this._cart.saveBooking(payload).subscribe((res: any) => {
      if (res.status == 1 || res.status == 2) {
        if (this.isBrowser) {
          const loader = document.getElementById("loader");
          if (loader) loader.style.display = "none";
        }
        Swal.fire({
          title: "Payment Success!",
          text: "Your order has been booked!",
          icon: "success"
        });
        this.ngOnInit();
        this._router.navigate(['/user/my-order'])
      } else if (res.status == 2) {
        $("#loader").hide();
        Swal.fire({
          title: "Payment Success!",
          text: "Your order has been booked!",
          icon: "success"
        });
        this.ngOnInit()
        this._router.navigate(['/user/my-order'])
      } else {
        $("#loader").hide();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  }

  paymentError(error: any,payload:any): void {
    console.error('Razorpay Error:', error);
    let data = {
      details: JSON.stringify(payload)
    }
    this.razorPayService.storeCanceledPaymentHistory(data).subscribe((res:any) => {
      if(res.status ==1) {
        console.log('Cancelation history save!')
      } else {
        console.error('Failed to save cancelation history!')
      }
    })
  }


  clearCheckOut() {
    this.uiLoader.start()
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    this._cart.checkoutClear(payload).subscribe((res: any) => {
      console.log(res.data)
      if (res.status == 1) {
        this.uiLoader.stop()
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Removed Successfully!",
          showConfirmButton: false,
          timer: 1000
        });
        this._router.navigate(['/cart/my-cart'])
      }
    })
  }

  getAllAddress() {
    this.uiLoader.start()
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    this._profile.getAddress(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.uiLoader.stop()
        this.addressItems = res.data
      }
    })

    // this.getLatLong()

  }


  getMapDetails(lat:number, long:number) {
    if (window.google && window.google.maps) {
      // Initialize the map
      this.map = new google.maps.Map(this.mapContainer2.nativeElement, {
        center: { lat: lat, lng: long },
        zoom: 7
      });

      // Initialize the DirectionsRenderer
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);

      // Initialize the DirectionsService
      this.directionsService1 = new google.maps.DirectionsService();

      // Example coordinates
      const origin: google.maps.LatLngLiteral = { lat: 22.590620, lng: 88.476220 };
      const destination: google.maps.LatLngLiteral = { lat: lat, lng: long };

      // Get the route and display it
      this.directionsService.getRoute(origin, destination).subscribe({
        next: (result) => {
          this.directionsRenderer.setDirections(result);
        },
        error: (err) => console.error(err)
      });
    } else {
      console.error('Google Maps API is not loaded.');
    }
  }
}
