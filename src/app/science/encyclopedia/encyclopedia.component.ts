import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
import { MasterService } from 'src/app/service/master.service';
declare var $: any;


@Component({
  selector: 'app-encyclopedia',
  templateUrl: './encyclopedia.component.html',
  styleUrls: ['./encyclopedia.component.css']
})
export class EncyclopediaComponent implements OnInit {
  pageItem:any;
  groupItem:any = [];
  p: number = 1;



  
  constructor(private _master: MasterService) { }

  ngOnInit(): void {
    AOS.init();

    $(document).ready(function(){
      $(".stpRow .mat-expansion-panel-header").click(function(){
        $(this).parent().parent('.stpRow').toggleClass('sgtp');
        $(this).parent().parent().siblings().removeClass('sgtp');
      });
    });

    this._master.getPageContent().subscribe((res:any) => {
      if(res.message == 'Success') {
        let pages = [];
        for(let item of res.data) {
          if(item.id == 17) {
            pages.push(item)
          }
          this.pageItem = pages;
        }
      }
    })

    this.getGroup('Organ');

    // Tab Click Script
    const blogTabs = document.getElementById("majorTabs") as HTMLDivElement;
    window.onload = () => {
      $(".blgTbHd").click(function(){
        $(".blgTbHd").removeClass("active show");
        $(this).addClass("active show");
        let tabId = $(this).attr("href");
        $(".blogTabs").removeClass("active show");
        $(`.blogTabs${tabId}`).addClass("active show");
      });
    };
  }
  
  getGroup(data:any) {
    $("#loader").show();
    const formData = new FormData();
    formData.append('group_type', data);
    this._master.getGroupMaster(formData).subscribe((res:any) => {
      if(res.message == 'Success') {
        this.groupItem = res.data;
        this.changeGroupData(res.data[0].id);
        $("#loader").hide();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  }
  groupInfo:any;
  changeGroupData(group_id){
    const formData = new FormData();
    formData.append('group_id', group_id);
    this._master.getGroupWiseItem(formData).subscribe((res:any) => {
      let group = [];
      if(res.message == 'Success') {
        group.push(res.data);
      }
      this.groupInfo = group;
    })
  }
  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    400:{
      items:2
    },
    800:{
      items:3
    },
    1200:{
        items:3
    },
    1700:{
      items:3
    },

  }, dots: false, nav: true}; 

  SlideOptioon = { responsive:{
    0:{
        items:1
    },
    400:{
      items:2
    },
    800:{
      items:3
    },
    1200:{
        items:3
    },
    1700:{
      items:3
    },

  }, dots: false, nav: true}; 
}
