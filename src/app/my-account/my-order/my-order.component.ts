import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  oderItem:any = []


  constructor(private _profile: ProfileService) { }

  ngOnInit(): void {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
  }
  $("#loader").show();
    this._profile.getMyOrderItems(payload).subscribe((res:any) => {
      $("#loader").hide();
      if(res.status == 1) {
        this.oderItem = Object.values(res.data.bookings)
      }
    })
  }

}
