import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
import $ from 'jquery';
;


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
  zoom = 13;
  totalcoins: any = 0
  code: any;
  filteredCoupons: any;
  coupon_id: any;
  searchText:any


  constructor(private _cart: CartService,
    private _router: Router, private _profile: ProfileService) { }

  ngOnInit(): void {
    $("#loader").hide();
    $("#alert").hide();
    this.getAllAddress()

    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const datepicker = document.getElementById('datepicker');
    datepicker.setAttribute('min', minDate);

    this.getCheckOut()
  }

  getCheckOut() {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": Number(localStorage.getItem('LOCATION_ID'))
    }
    this._cart.getcheckoutItems(payload).subscribe((res: any) => {
      if (res.status == 1) {
        $("#loader").hide();
        this.allItems = res.data
        // if (this.allItems?.bookings?.length == 0) {
        //   this._router.navigate(['/cart/my-cart'])
        //   return
        // }

        this.totalPrice = this.allItems.totalAmount
        this.grossPrice = this.allItems.totalAmount
      } else if (res.status == 403 || res.status == 503) {
        $("#alert").show();
      }
    })

    this.getAllCoins()
  }

  uploadPres(event: any, i: any) {
    let items = this.allItems.bookings.patientDetails
    let patientId: any
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (index == i) {
        patientId = element.patient_id
      }
    }

    const formData = new FormData();
    formData.append('schemaName', 'nir1691144565');
    formData.append('booking_id', this.allItems.bookings.booking_id);
    formData.append('patient_id', patientId);
    formData.append('prescription', event.target.files[0]);
    this._cart.storePrescription(formData).subscribe((res: any) => {
      if (res.status == 1) {
        this.ngOnInit()
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Uploaded successfully !",
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
  }

  saveDoctor(doctor: any, id: any) {

    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID'),
      "patient_id": id,
      "doctor_name": doctor 
    }
    this._cart.saveDoctorName(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.ngOnInit()
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Doctor added successfully !",
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
  }
  

  getAllCoins() {
    let payload = {
      "schemaName": "nir1691144565",
      "userID": localStorage.getItem('USER_ID')
    }
    this._profile.getCoins(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.myCoins = res.data
        this.totalcoins = res.data.balance
      }
    })
    this.getMyCoupons()
  }

  slotItems: any = []
  getMyCoupons() {
    let payload = {
        "schemaName": "nir1691144565",
        "user_id": localStorage.getItem('USER_ID')
    }
    this._cart.getCoupons(payload).subscribe((res: any) => {
        if (res.status == 1) {
            this.coupons = res.data;
            this.filteredCoupons = this.coupons; // Initialize filteredCoupons with all coupons initially
        }
    });

    // Slot API
    let slotPayload = {
        "schemaName": "nir1691144565",
    }
    this._cart.getAllSlot(slotPayload).subscribe((res: any) => {
        if (res.status == 1) {
            let slotItem = []
            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                if (element.status == 1) {
                    slotItem.push(element)
                }
            }
            this.slotItems = slotItem;
        }
    });
}

filterCoupons(searchValue: string) {
  this.searchText = searchValue
  // if (!searchValue) {
  //   this.filteredCoupons = this.coupons; // If search value is empty, show all coupons
  //   this.removeCoupon(); // Clear the coupon and restore the discount
  // } else {
  //   this.filteredCoupons = this.coupons.filter(coupon =>
  //     coupon.couponName.toLowerCase().includes(searchValue.toLowerCase()) ||
  //     coupon.couponCode.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  // }
}

getCouponDiscount(mycoupon: any) {
  this.applyCoupon('', mycoupon);
}

applyCoupon(code: any, coupon: any) {
  let couponItem = coupon || this.coupons.find(c => c.couponCode === code);
  if (couponItem) {
    $('#couponCode').val(couponItem.couponCode);
    $('#applybtn').val('Applied');
    this.activeCoupon = couponItem;

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
    console.log("Coupon not found."); // Log message for debugging
  }
}

removeCoupon() {
  if (this.activeCoupon) {
    this.discount = 0; // Reset discount
    this.totalPrice = this.allItems.totalAmount; // Reset total price to the original amount
    this.activeCoupon = null; // Clear active coupon
    $('#couponCode').val(''); // Clear input field
    $('#applybtn').val('Apply'); // Reset button text
  }
}

isCouponActive(coupon: any): boolean {
  this.coupon_id = coupon.couponId;
  return this.activeCoupon && this.activeCoupon.couponCode === coupon.couponCode;
}


  addressCheck(addrId: any) {
    this.addr_id = addrId
  }

  usedCoins: any = 0
  async isCoinsUse(event: any, coins: any) {
    const toIndianCurrency = (num: any) => {
      const curr = num.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR'
      });
      return curr;
    };


    let amount = await this.totalPrice
    let amount2 = await this.totalPrice
    let coinsValue: any
    if (event.target.checked == true && coins > 0) {
      if (coins >= amount) {
        let remain = coins - amount
        this.restcoins = remain
        let totalremain = coins - remain
        this.mycoins = amount
        coinsValue = amount - totalremain
        this.usedCoins = totalremain
      }
      else {
        this.mycoins = amount - coins
        coinsValue = amount - coins
        this.usedCoins = coins
        this.restcoins = 0
      }
      document.getElementById('restcoins').innerHTML = this.restcoins
      document.getElementById('pay').innerHTML = `Pay ${toIndianCurrency(coinsValue)}`

    } else {
      if (coins >= amount) {
        this.mycoins = 0
        coinsValue = amount2
        this.usedCoins = 0
      } else {
        coinsValue = amount2
        this.mycoins = coins
        this.restcoins = coins
        this.usedCoins = 0
      }
      document.getElementById('restcoins').innerHTML = this.totalcoins
      document.getElementById('pay').innerHTML = `Pay ${toIndianCurrency(coinsValue)}`
    }

    this.aftercoinsMrp = coinsValue
  }


  getSlot(id: any) {
    this.slotId = id
  }

  selectBookingDate(event: any) {
    this.bookingDate = event.target.value
    if (this.bookingDate) {
      this.isDate = true
    } else {
      this.isDate = false
    }
  }

  payNow() {
    if (this.bookingDate == null && this.allItems.booking && this.allItems.booking.length > 0 && this.allItems.booking.filter(obj => obj.doctorName == null).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Sorry",
        text: "Please choose your Booking slot!",
      });
      return;
    }
    // Check if addr_id is not assigned
    if (!this.addr_id) {
      Swal.fire({
        icon: "error",
        title: "Address Missing",
        text: "Please provide your address.",
      });
      return;
    }
  
    // Check if bookingDate is not assigned
    if (!this.bookingDate) {
      Swal.fire({
        icon: "error",
        title: "Booking Date Missing",
        text: "Please choose your booking date.",
      });
      return;
    }
  
    // Check if slotId is not assigned
    if (!this.slotId) {
      Swal.fire({
        icon: "error",
        title: "Slot Missing",
        text: "Please choose your booking slot.",
      });
      return;
    }

    let payload = {
      "user_id": localStorage.getItem('USER_ID'),
      // "booking_id": this.allItems.bookings.booking_id,
      "gross_amount": this.grossPrice,
      "discount_amount": this.discount,
      "received_amount": this.aftercoinsMrp == 0 ? this.totalPrice : this.aftercoinsMrp,
      "paymentStatus": 1,
      "paymentDetails": JSON.stringify([{ trnx_id: 'TTCNI022000800594', payment_status: 'Recieved' }]),
      "coins": this.usedCoins,
      "coupon_id": this.coupon_id,
      "address_id": this.addr_id,
      "patientDetails": JSON.stringify(this.allItems.bookings),
      "slot_date": this.bookingDate,
      "slot_id": this.slotId
    }
    console.log(payload)
    // return
    this._cart.saveBooking(payload).subscribe((res: any) => {
      if (res.status == 1) {
        $("#loader").hide();
        Swal.fire({
          title: "Payment Success!",
          text: "Your order has been booked!",
          icon: "success"
        });
        this.ngOnInit()
        this._router.navigate(['/user/my-order'])
        // setTimeout(() => {
        // }, 2000);
      } else if (res.status == 2) {
        $("#loader").hide();
        Swal.fire({
          title: "Payment Success!",
          text: "Your order has been booked!",
          icon: "success"
        });
        this.ngOnInit()
        this._router.navigate(['/user/my-order'])
        // setTimeout(() => {
        // }, 2000);
      } else {
        $("#loader").hide();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
    return
    // this._auth.initiatePayment(this.aftercoinsMrp == 0 ? this.totalPrice : this.aftercoinsMrp);
    // return
    // if (payload.address_id == null) {
    //   $("#loader").hide();
    //   Swal.fire({
    //     icon: "error",
    //     title: "Sorry",
    //     text: "Please select address !",
    //   });
    //   return;
    // }
    return
    let timerInterval;
    Swal.fire({
      title: "Payment processing!",
      html: "I will complete in <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 200);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
        Swal.fire({
          title: "Payment Success",
          text: "Your order has been placed successfully",
          icon: "success",
        });
      }
    });
    $("#loader").show();
    this._cart.saveBooking(payload).subscribe((res: any) => {
      console.log(res)
      if (res.status == 1) {
        $("#loader").hide();
        Swal.fire({
          title: "Payment Success!",
          text: "Your order has been booked!",
          icon: "success"
        });
        this.ngOnInit()
        this._router.navigate(['/user/my-order'])
        // setTimeout(() => {
        // }, 2000);
      } else {
        $("#loader").hide();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })

  }


  clearCheckOut() {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    this._cart.checkoutClear(payload).subscribe((res: any) => {
      console.log(res.data)
      if (res.status == 1) {
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
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    this._profile.getAddress(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.addressItems = res.data
      }
    })

    // this.getLatLong()

  }

  getLatLong() {
    // Location Lat Long
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position: any) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const locationElement = document.getElementById('location');
      locationElement.innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}`;
    }

    function showError(error: any) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
      }
    }
    getLocation()

  }


}
