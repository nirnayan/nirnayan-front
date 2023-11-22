import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  allItems: any = []



  constructor(private _cart: CartService) { }

  ngOnInit(): void {
    $("#loader").hide();

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
        if(res.status == 1) {
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
}
