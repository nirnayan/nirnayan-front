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
  patients:any = []
  cartlist:any = []
  totalCost:any = 0
  
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

    let payload1 = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": Number(localStorage.getItem('LOCATION_ID'))
    }
    this._cart.getCartList(payload1).subscribe((res:any) => {
      if(res.status == 1) {
        this.cartlist = res.data
        let sumPrice = 0
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          sumPrice += parseInt(element.product_details.amount)
        }
        console.log(sumPrice)
        this.totalCost = sumPrice
      }
      else if(res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    })

  }

  selectPatient(event:any,itemId:any,prodId:any,prodType:any) {
    let patientId = event.target.value
    let payload = {
      schemaName: 'nir1691144565',
      patient_id: Number(patientId),
      prod_id: prodId,
      cartItemID: itemId,
      prod_type: prodType
    }
    this._cart.updatePatient(payload).subscribe((res:any) => {
      if(res.status == 1) {
        this.ngOnInit()
      }
    })
  }

  deleteItem(id:any) {
    let payload = {
      "schemaName": "nir1691144565",
      "cartItemID": Number(id)
    }
    this._cart.deleteCart(payload).subscribe((res:any) => {
      if(res.status == 1) {
        let total:any = this.cartlist.length - 1
        this._auth.sendQtyNumber(total);
        this.ngOnInit()
      }
    })
  }
}
