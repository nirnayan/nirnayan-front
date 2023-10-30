import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';
declare var $: any;  


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  homePage:any = [];
  bannerItem:any = [];
  isBannerLoad: boolean = true



  constructor(private _master: MasterService) { }

  ngOnInit(): void {
    $("#loader").show();
    this._master.getPageContent().subscribe((res:any) => {
      if(res.message == 'Success') {
        for(let item of res.data) {
          if(item.id == 16) {
            this.homePage.push(item)
            this.isBannerLoad = false
            $("#loader").hide();
          }
        }

        if(this._master.bannerItem) {
         this.bannerItem =  this._master.bannerItem
         $("#loader").hide();
        } else {
          for(let item of this.homePage[0]['category']) {
          const formData = new FormData();
          formData.append('category_id', item.item_id);
          this._master.getPostByCat(formData).subscribe((res:any) => {
            if(res.message == 'Success') {
              this.bannerItem = res.data;
              $("#loader").hide();
              this._master.bannerItem = res.data
            }
          })
          }
        }

      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  }

}
