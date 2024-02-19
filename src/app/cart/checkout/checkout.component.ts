import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { AuthService } from 'src/app/service/auth.service';


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

  mycoins: any = 0
  restcoins: any = 0
  aftercoinsMrp: any = 0

  addressForm: FormGroup
  isLandmarkName: any
  addrId: any
  addressItems: any = []
  isEdit: boolean = false
  submitted: boolean = false
  isLandmark: boolean = false
  latitude!: number;
  longitude!: number;
  zoom = 13;
  totalcoins:any = 0


  
  constructor(private _cart: CartService, private _fb: FormBuilder,
    private _router: Router, private _profile: ProfileService,
    private _auth: AuthService) {
    this.addressForm = this._fb.group({
      schemaName: ['nir1691144565'],
      user_id: [''],
      addressName: ['', Validators.required],
      fullName: ['', Validators.required],
      contactNumber: [Number, Validators.required],
      alt_contactNumber: [Number, ''],
      pinCode: [Number, Validators.required],
      state: [''],
      city: [''],
      addressLine_1: ['', Validators.required],
      addressLine_2: ['', Validators.required],
      landMark: [null, '']
    })
  }

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
        this.coupons = res.data
      }
    })

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
        this.slotItems = slotItem
      }
    })
  }

  coupon_id: any = null
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
    if (event.target.checked == true) {
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
      "received_amount": this.aftercoinsMrp == 0 ? this.totalPrice : this.aftercoinsMrp,
      "paymentStatus": 1,
      "paymentDetails": JSON.stringify([{ trnx_id: 'TTCNI022000800594', payment_status: 'Recieved' }]),
      "coins": this.usedCoins,
      "coupon_id": this.coupon_id,
      "address_id": this.addr_id,
      "slot_date": this.bookingDate,
      "slot_id": this.slotId
    }

    // this._auth.initiatePayment(this.aftercoinsMrp == 0 ? this.totalPrice : this.aftercoinsMrp);
    // return
    if (payload.address_id == null) {
      $("#loader").hide();
      Swal.fire({
        icon: "error",
        title: "Sorry",
        text: "Please select address !",
      });
      return;
    }
    $("#loader").show();
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
      if (res.status == 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Removed Successfully!",
          showConfirmButton: false,
          timer: 1000
        });
        this._router.navigate(['/cart/my-cart'])
      }
    })
  }

  // Address Start
  // saveAddress() {
  //   console.log(this.addressForm.value)
  //   this.addressForm.value['user_id'] = localStorage.getItem('USER_ID')
  //   this._profile.storeAddress(this.addressForm.value).subscribe((res: any) => {
  //     if (res.status == 1) {
  //       alert("Submitted Successfully !")
  //       this.addressForm.reset()
  //       this.getAllAddress()
  //       this.ngOnInit()
  //     }
  //   })
  // }

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

  editAddr(id: any) {
    this.isEdit = true
    this.addrId = id
    let payload = {
      "schemaName": "nir1691144565",
      "addressID": id
    }

    this._profile.getAddressById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        // this.patientForm.get("addressName").setValue(res.data[0].addressName);
        this.addressForm.get("fullName").setValue(res.data[0].fullName);
        this.addressForm.get("contactNumber").setValue(res.data[0].contactNumber);
        this.addressForm.get("alt_contactNumber").setValue(res.data[0].alt_contactNumber);
        this.addressForm.get("pinCode").setValue(res.data[0].pinCode);
        this.addressForm.get("state").setValue(res.data[0].state);
        this.addressForm.get("city").setValue(res.data[0].city);
        this.addressForm.get("addressLine_1").setValue(res.data[0].addressLine_1);
        this.addressForm.get("addressLine_2").setValue(res.data[0].addressLine_2);
        this.addressForm.get("landMark").setValue(res.data[0].landMark);
        this.isLandmarkName = res.data[0].addressName

      }
    })
  }

  updateAddress() {
    this.addressForm.value['user_id'] = localStorage.getItem('USER_ID')
    this.addressForm.value['addressID'] = this.addrId
    this._profile.updateAddress(this.addressForm.value).subscribe((res: any) => {
      if (res.status == 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Updated successfully !",
          showConfirmButton: false,
          timer: 1000
        });
        this.isEdit = false
        this.ngOnInit()
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    })
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

    // Address Start
    saveAddress() {
      this.submitted = true
      this.addressForm.value['user_id'] = localStorage.getItem('USER_ID')
      this.addressForm.value['schemaName'] = 'nir1691144565'
      this._profile.storeAddress(this.addressForm.value).subscribe((res: any) => {
        if (res.status == 1) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Address saved successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          this.addressForm.reset()
          this.getAllAddress()
          $("#addressModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
        }
      })
    }
}
