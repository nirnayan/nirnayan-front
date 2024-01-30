import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jquery';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {

  allFiles: any = [];
  cardImageBase64: string;
  patients: any = []
  allPrescriptions: any = []
  BaseUrl = environment.LimsEndpointBase
  @ViewChild('closeModel') closeModel!: ElementRef;
  prescriptionInfo: any
  prescriptionId:any = null
  cartlist:any = []


  constructor(private _profile: ProfileService,
    private _router: Router, private _auth: AuthService, private _cart: CartService) { }

  ngOnInit(): void {
    $("#loader").hide();
    let payload = {
      schemaName: 'nir1691144565',
      user_id: Number(localStorage.getItem('USER_ID'))
    }
    this._profile.getPatient(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.patients = res.data
      }
      else if (res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    })

    let payload2 = {
      schemaName: 'nir1691144565',
      userId: Number(localStorage.getItem('USER_ID'))
    }

    this._profile.getPrescription(payload2).subscribe((res: any) => {
      $("#loader").hide();
      if (res.status == 1) {
        this.allPrescriptions = res.data
      }
    }, err => {
      console.log(err)
      $("#loader").hide();
    })

    let payload1 = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": Number(localStorage.getItem('LOCATION_ID'))
    }
    this._cart.getCartList(payload1).subscribe((res:any) => {
      if(res.status == 1) {
        this.cartlist = res.data
      }
      else if(res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    }, err => {
      console.log(err)
      $("#loader").hide();
    })
  }


  fileSelect(e: any): void {
    for (var i = 0; i < e.target.files.length; i++) {
      this.allFiles.push(e.target.files[i]);
    }

  }

  removeFile(indx: any): void {
    $('#upldfile').val(null)
    this.allFiles.splice(indx, 1)
  }

  prescriptionSubmit(patientid: any, remarks: any) {
    if (patientid.value == '' || this.allFiles.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are mandatory!",
      });
      return
    }

    let formData = new FormData();
    $("#loader").show();
    for (var i = 0; i < this.allFiles.length; i++) {
      formData.append("prescription", this.allFiles[i]);
    }
    formData.append('schemaName', 'nir1691144565');
    formData.append('cust_remarks', remarks);
    formData.append('patientId', patientid.value);

    this._profile.addPrescription(formData).subscribe((res: any) => {
      $("#loader").hide();
      if (res.status == 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Prescription Submitted!",
          showConfirmButton: false,
          timer: 1500
        });
        this.ngOnInit()
        this.allFiles = []
        $('#upldfile').val(null)
      }
    }, err => {
      console.log(err)
      $("#loader").hide();
    })
  }

  viewTest(id: any) {
    this.prescriptionId = id
    let payload = {
      "schemaName": "nir1691144565",
      "prescriptionId": id
    }
    this._profile.getPrescriptionByid(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.prescriptionInfo = res.data[0]
      }
    })
  }

  removePrescription(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        let payload = {
          "schemaName": "nir1691144565",
          "prescriptionId": id
        }

        this._profile.deletePrescription(payload).subscribe((res: any) => {
          if (res.status == 1) {
            this.ngOnInit();
          }
        })

      }
    });
  }

  // Move to cart
  moveToCart() {
    let valueCount = this.prescriptionInfo.otherDetails.testIds.length
    let payload = {
      "schemaName": "nir1691144565",
      "prescriptionId": this.prescriptionId
    }
    $("#loader").show();
    this._profile.prescriptionMoveToCart(payload).subscribe((res: any) => {
      $("#loader").hide();
      if (res.status == 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Added into your cart!",
          showConfirmButton: false,
          timer: 1500
        });
        this._auth.sendQtyNumber(this.cartlist.length + valueCount);
        this.closeModal()
      }
    }, err => {
      console.log(err)
      $("#loader").hide();
    })
  }

  closeModal() {
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }

}
