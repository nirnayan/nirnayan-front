import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  allItems:any = []



  constructor(private _cart: CartService) { }

  ngOnInit(): void {
    $("#loader").hide();
    
    this.getCheckOut()
  }


  getCheckOut() {
    let payload  = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID'))
  }
    this._cart.getcheckoutItems(payload).subscribe((res:any) => {
      if(res.status == 1) {
        this.allItems = res.data
      }
    })
  }
}
