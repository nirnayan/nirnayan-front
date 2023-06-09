import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from 'src/app/service/master.service';
declare var $: any; 


@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css']
})
export class OurTeamComponent implements OnInit {

  ourTemItem:any = [];
  doctorItem:any = [];
  isActive: any = 0;


  constructor(private _master: MasterService,
    private _spiner: NgxSpinnerService) { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.teamTopButton span:first-child').on('click', function() {
        $('.teamMemberInner:first-child').addClass('active');
        $('.teamTopButton span:first-child').addClass('active');
        $('.teamMemberInner:nth-child(2)').removeClass('active');
        $('.teamTopButton span:nth-child(2)').removeClass('active');
      });
      $('.teamTopButton span:nth-child(2)').on('click', function() {
        $('.teamMemberInner:nth-child(2)').addClass('active');
        $('.teamTopButton span:nth-child(2)').addClass('active');
        $('.teamMemberInner:first-child').removeClass('active');
        $('.teamTopButton span:first-child').removeClass('active');
      });
    });

    this.getAllPages();
  }


  getAllPages() {
    this._spiner.show();
    this._master.getPageContent().subscribe((res:any) => {
      this._spiner.hide();
      if(res.message == 'Success') {
        let ourTem = res.data;
        for(let item of ourTem) {
          if(item.id == 3) {
            this.ourTemItem.push(item);
          }
        }
      }
      $("#loader").hide();
    })
    this.getCatId(7,'')
  }

  getCatId(catId:any,i:any) {
    this.isActive = i;
    const formData = new FormData();
    formData.append('category_id', catId);
    this._master.getAllPost(formData).subscribe((res:any) => {
      this._spiner.hide();
      if(res.message == 'Success') {
        this.doctorItem = res.data;
      }
      $("#loader").hide();
    })
  }

}
