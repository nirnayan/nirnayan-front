import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
import { ProfileService } from 'src/app/service/profile.service';
declare var $: any;


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  cartlist:any = []
  patients:any = []


  
  constructor(private _profile: ProfileService) { }

  ngOnInit(): void {
    // AOS.init();

    let payload1 = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    this._profile.getCartList(payload1).subscribe((res:any) => {
      console.log(res)
      if(res.status == 1) {
        this.cartlist = res.data
      }
    })

    let payload2 = {
      schemaName: 'nir1691144565',
      user_id: localStorage.getItem('USER_ID')
    }
    this._profile.getPatient(payload2).subscribe((res: any) => {
      if (res.status == 1) {
        this.patients = res.data
      }
    })
  }

}
