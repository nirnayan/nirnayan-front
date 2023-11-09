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
    $("#loader").show();
    // AOS.init();
    let payload2 = {
      schemaName: 'nir1691144565',
      user_id: Number(localStorage.getItem('USER_ID'))
    }

    if(this._profile.patientItem) {
      this.patients = this._profile.patientItem
    } else {
      this._profile.getPatient(payload2).subscribe((res: any) => {
        if (res.status == 1) {
          this.patients = res.data
          this._profile.patientItem = res.data
        }
      })
    }

    let payload1 = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": Number(localStorage.getItem('LOCATION_ID'))
    }
    this._cart.getCartList(payload1).subscribe((res:any) => {
      $("#loader").hide();
      if(res.status == 1) {
        this.cartlist = res.data
        let sumPrice = 0
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          sumPrice += parseInt(element.product_details.amount)
        }
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

  goForCheckOut() {
    let cartItemArr = []
    for (let index = 0; index < this.cartlist.length; index++) {
      const element = this.cartlist[index];
      cartItemArr.push({'id':element.id})
    }
    let cartPayload = [{
      schemaName: 'nir1691144565',
      test_id: cartItemArr,
      user_id: localStorage.getItem('USER_ID'),
      payment_status: 1,
      payment_mode: 'Pay on delivery',
      transaction_id: 'TRX4857485739845',
      
    }]
    console.log('cartItemArr',cartPayload)
    this._router.navigate(['/cart/checkout'])
  }
  
  deleteItem(id:any) {
    let payload = {
      "schemaName": "nir1691144565",
      "cartItemID": Number(id)
    }
    this._cart.deleteCart(payload).subscribe((res:any) => {
      if(res.status == 1) {
        $('#liveToast').addClass('show')
        let total:any = this.cartlist.length - 1
        this._auth.sendQtyNumber(total);
        this.ngOnInit()
        setTimeout(() => {
          $('#liveToast').removeClass('show')
        }, 1000);
      }
    })
  }
}
