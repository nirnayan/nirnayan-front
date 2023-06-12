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
  }
  
  getGroup(data:any) {
    const formData = new FormData();
    formData.append('group_type', data);
    this._master.getGroupMaster(formData).subscribe((res:any) => {
      console.log(res);
      if(res.message == 'Success') {
        this.groupItem = res.data;
      }
    })
  }
}
