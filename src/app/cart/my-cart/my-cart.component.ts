import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  patients: any = []
  cartlist: any = []
  totalCost: any = 0
  isCheckOutItem: any

  constructor(private _profile: ProfileService,
    private _router: Router,
    private _auth: AuthService,
    private _cart: CartService) { }

  ngOnInit(): void {

    // AOS.init();
    let payload2 = {
      schemaName: 'nir1691144565',
      user_id: Number(localStorage.getItem('USER_ID'))
    }

    this._profile.getPatient(payload2).subscribe((res: any) => {
      if (res.status == 1) {
        this.patients = res.data
      }
    })

    $("#loader").show();
    let payload1 = {
      // Number(localStorage.getItem('LOCATION_ID'))
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": 36
    }
    this._cart.getCartList(payload1).subscribe((res: any) => {
      $("#loader").hide();
      if (res.status == 1) {
        this.cartlist = res.data
        let sumPrice = 0
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          sumPrice += parseInt(element.product_details.amount)
        }
        this.totalCost = sumPrice
      }
      else if (res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    })

    // Checkout item check
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID'))
    }
    this._cart.checkCheckoutItem(payload).subscribe((res: any) => {
      if (res.success == true) {
        this.isCheckOutItem = res
      }
    })
  }

  selectPatient(event: any, itemId: any, prodId: any, prodType: any, cart: any): void {
    let patientId = event.target.value
    let payload = {
      schemaName: 'nir1691144565',
      patient_id: Number(patientId),
      prod_id: prodId,
      cartItemID: itemId,
      prod_type: prodType
    }
    this._cart.updatePatient(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.ngOnInit();
      } else {
        cart.patient_id = '';
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.data,
        })
        // this.ngOnInit()
      }
    })
  }

  goForCheckOut() {
    let tempElements = [];
    for (let i = 0; i < this.cartlist.length; i++) {
      const element = this.cartlist[i];
      tempElements.push(element);
    }
    let payloadPatientDetails = [];
    for (const tempElement of tempElements) {
      let isPatientAvailable = false;
      for (const item of payloadPatientDetails) {
        if (item.patient_id == tempElement.patient_id) isPatientAvailable = true;
      }
      if (!isPatientAvailable) payloadPatientDetails.push({ patient_id: tempElement.patient_id, test_id: [], doctor_name: '' });
      payloadPatientDetails.forEach(item => {
        if (item.patient_id == tempElement.patient_id) {
          item.test_id.push(tempElement.prod_id)
        }
      });
    }

    let cartPayload = [{
      schemaName: 'nir1691144565',
      patientDetails: JSON.stringify(payloadPatientDetails),
      user_id: localStorage.getItem('USER_ID'),
      gross_amount: this.totalCost,
    }]

    this._cart.moveTocheckout(cartPayload[0]).subscribe((res: any) => {
      if (res.status == 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Redirecting to billing page !",
          showConfirmButton: false,
          timer: 1500
        });
        this._router.navigate(['/cart/checkout'])
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Patient name Error!",
        });
      }
    })

  }

  deleteItem(id: any) {
    let payload = {
      "schemaName": "nir1691144565",
      "cartItemID": Number(id)
    }
    this._cart.deleteCart(payload).subscribe((res: any) => {
      if (res.status == 1) {
        $('#liveToast').addClass('show')
        let total: any = this.cartlist.length - 1
        this._auth.sendQtyNumber(total);
        this.ngOnInit()
        setTimeout(() => {
          $('#liveToast').removeClass('show')
        }, 1000);
      }
    })
  }

  clearCartItem() {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }

    this._cart.cartClear(payload).subscribe((res: any) => {
      if (res.status == 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Removed Successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        this._router.navigate(['/patient/test-list'])
      }
    })
  }

}
