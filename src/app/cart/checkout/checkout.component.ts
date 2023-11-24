import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  allItems: any = []
  totalPrice: any
  discount: any = null
  grossPrice:any


  constructor(private _cart: CartService,
    private _router: Router) { }

  ngOnInit(): void {
    $("#loader").hide();
    $("#alert").hide();

    this.getCheckOut()
  }


  getCheckOut() {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID'))
    }
    this._cart.getcheckoutItems(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.allItems = res.data
        if (this.allItems?.bookings?.length == 0) {
          this._router.navigate(['/cart/my-cart'])
          return
        }
        let testArr = this.allItems.bookings.patientDetails[0].tests
        let sumPrice = 0
        for (let index = 0; index < testArr.length; index++) {
          const element = testArr[index];
          sumPrice += parseInt(element.amount)
        }

        this.totalPrice = sumPrice
        this.grossPrice = sumPrice
      } else if (res.status == 403) {
        $("#alert").show();
      }
    })
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
          position: "top-end",
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
          position: "top-end",
          icon: "success",
          text: "Doctor added successfully !",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })

  }

  applyFilter(promocode: any) {
    let data = (Number(promocode) / 100) * this.totalPrice
    this.discount = data
    this.totalPrice = this.totalPrice - Number(data)
  }

  payNow() {
    let payload = {
      "schemaName": "nir1691144565",
      "booking_id": this.allItems.bookings.booking_id,
      "gross_amount": this.grossPrice,
      "discount_amount": this.discount,
      "received_amount": this.totalPrice,
      "paymentStatus": 1,
      "paymentDetails": [],
      "address_id": this.allItems.addressList[0].id
  }

  this._cart.saveBooking(payload).subscribe((res:any) => {
    if(res.status == 1) {
      let timerInterval;
      Swal.fire({
        title: "Redirecting to Payment!",
        html: "I will close in <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
      setTimeout(() => {
        this._router.navigate(['/cart/my-cart'])
      }, 2000);
    }
  })

  }
}
