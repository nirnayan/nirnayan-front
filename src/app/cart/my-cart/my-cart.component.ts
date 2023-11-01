import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos'; 
import { AuthService } from 'src/app/service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  cartlist:any = []
  patients:any = []


  
  constructor(private _profile: ProfileService,
    private _router: Router,
    private _auth: AuthService) { }

  ngOnInit(): void {
    // AOS.init();

    let payload1 = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID'))
    }
    this._profile.getCartList(payload1).subscribe((res:any) => {
      if(res.status == 1) {
        this.cartlist = res.data
      }
      else if(res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    })

    let payload2 = {
      schemaName: 'nir1691144565',
      user_id: Number(localStorage.getItem('USER_ID'))
    }
    this._profile.getPatient(payload2).subscribe((res: any) => {
      if (res.status == 1) {
        this.patients = res.data
      }
    })
  }

  selectPatient(event:any,itemId:any) {
    let patientId = event.target.value
    console.log('patientId',patientId, 'itemId', itemId)
    // let payload = {
    //   schemaName: '',
    //   patient_id: patientId,
    //   patientName: ''
    // }
    // this._profile.updatePatient(payload).subscribe((res:any) => {
    //   console.log(res)
    // })
  }

  deleteItem(id:any) {
    let payload = {
      "schemaName": "nir1691144565",
      "cartItemID": Number(id)
    }
    this._profile.deleteCart(payload).subscribe((res:any) => {
      if(res.status == 1) {
        let total:any = this.cartlist.length - 1
        this._auth.sendQtyNumber(total);
        this.ngOnInit()
      }
    })
  }
}
