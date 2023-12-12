import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  allItems: any = []
  totalPrice: any
  discount: any = 0
  grossPrice: any
  addr_id: any = null
  myCoins: any
  coupons: any = []
  slotId: any
  bookingDate: any = null
  isDate: boolean = false


  constructor(private _cart: CartService,
    private _router: Router, private _profile: ProfileService) { }

  ngOnInit(): void {
    $("#loader").hide();
    $("#alert").hide();


    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const datepicker = document.getElementById('datepicker');
    datepicker.setAttribute('min', minDate);

    this.getCheckOut()
  }


  getCheckOut() {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID'))
    }
    this._cart.getcheckoutItems(payload).subscribe((res: any) => {
      if (res.status == 1) {
        $("#loader").hide();
        this.allItems = res.data
        // if (this.allItems?.bookings?.length == 0) {
        //   this._router.navigate(['/cart/my-cart'])
        //   return
        // }

        this.totalPrice = this.allItems.bookings.booking_amount
        this.grossPrice = this.allItems.bookings.booking_amount
      } else if (res.status == 403) {
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
          timer: 1500
        });
      }
    })
  }

  saveDoctor(doctor: any, i: any) {
    let items = this.allItems.bookings.patientDetails
    let patientId: any
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (index == i) {
        patientId = element.patient_id
      }
    }


    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID'),
      "patient_id": patientId,
      "booking_id": this.allItems.bookings.booking_id,
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
          timer: 1500
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
        this.coupons = res.data
      }
    })

    // Slot API
    let slotPayload = {
      "schemaName": "nir1691144565",
    }
    this._cart.getAllSlot(slotPayload).subscribe((res: any) => {
      if (res.status == 1) {
        let slotItem  = []
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          if(element.status == 1) {
            slotItem.push(element)
          }
        }
        this.slotItems = slotItem
      }
    })
  }

  coupon_id: any
  getCouponDiscount(mycoupon: any) {
    this.coupon_id = mycoupon.couponId
    this.applyCoupon('', mycoupon)
  }

  applyCoupon(code: any, coupon: any) {
    let couponItem = coupon
    $('#couponCode').val(couponItem.couponCode)
    $('#applybtn').val('Applied')
    if (couponItem.benefits.discount.discount_type == 2) {
      let discountAmt = coupon.benefits.discount.discount_percent
      let booking_amount = this.allItems.bookings.booking_amount
      let data = (Number(discountAmt) / 100) * booking_amount
      this.discount = data
      this.totalPrice = booking_amount - Number(data)
    } else {
      let discountAmt = coupon.benefits.discount.max_discount_amount
      this.discount = discountAmt
      let booking_amount = this.allItems.bookings.booking_amount
      this.totalPrice = booking_amount - Number(discountAmt)
    }

  }

  addressCheck(addrId: any) {
    this.addr_id = addrId
  }

  mycoins: any = 0
  isCoinsUse(event: any, coins: any) {
    let coinsValue: any
    let amount = this.totalPrice

    if (event.target.checked == true) {
      coinsValue = amount - coins
      this.mycoins = coins
    } else {
      coinsValue = amount + coins
      this.mycoins = 0
    }

    this.totalPrice = coinsValue
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
    // $("#loader").show();
    if (this.bookingDate == null) {
      Swal.fire({
        icon: "error",
        title: "Sorry",
        text: "Please choose your Booking slot!",
      });
      return
    }

    let payload = {
      "schemaName": "nir1691144565",
      "booking_id": this.allItems.bookings.booking_id,
      "gross_amount": this.grossPrice,
      "discount_amount": this.discount,
      "received_amount": this.totalPrice,
      "paymentStatus": 1,
      "paymentDetails": JSON.stringify([{ trnx_id: 'TTCNI022000800594', payment_status: 'Recieved' }]),
      "coins": this.mycoins,
      "coupon_id": this.coupon_id,
      "address_id": this.addr_id,
      "slot_date": this.bookingDate,
      "slot_id": this.slotId
    }

    if (payload.address_id == null) {
      $("#loader").hide();
      Swal.fire({
        icon: "error",
        title: "Sorry",
        text: "Please select address !",
      });
      return;
    }

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
      }
    })

  }


  clearCheckOut() {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    this._cart.checkoutClear(payload).subscribe((res: any) => {
      if (res.status == 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Removed Successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        this._router.navigate(['/cart/my-cart'])
      }
    })
  }
}
