import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
declare var $: any;

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  oderItem: any = []


  constructor(private _profile: ProfileService) { }

  ngOnInit(): void {
    window.onload = () => {
      $(document).on("click", ".arrow", function () {
        $(this).parent().parent().children(".ptTstNm").slideToggle();
        $(this).addClass('close');
      });
    };

    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    $("#loader").show();
    this._profile.getMyOrderItems(payload).subscribe((res: any) => {
      $("#loader").hide();
      if (res.status == 1) {
        this.oderItem = Object.values(res.data.bookings)
        console.log(this.oderItem)
      }
    });


  }

  pastItem: any = []
  pastOrder() {
    $("#loader").show();
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    this._profile.getPastOrder(payload).subscribe((res: any) => {
      $("#loader").hide();
      if (res.success == true) {
        this.pastItem = res.data
      }
    })
  }
}
