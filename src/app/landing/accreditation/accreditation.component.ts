import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from 'src/app/service/blog.service';
declare var $: any;

@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.css']
})
export class AccreditationComponent implements OnInit {
  allAccred:any;
  isPublish:any = [];


  constructor(private _blog: BlogService,
    private _spiner: NgxSpinnerService) { }

  ngOnInit(): void {
    AOS.init();
    this._blog.getallAccred().subscribe((res:any) => {
      if(res.message == 'Success') {
        this.allAccred = res.data;
        for(let item of this.allAccred) {
          if(item.status == 1) {
            this.isPublish.push(item);
          }
        }
        this.showItem(this.isPublish[0])
        // console.log(this.isPublish)
      }
    })
  }
  
  acctdItem:any = null
  showItem(item:any):void {
    this.acctdItem = item
  }

  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    800:{
      items:2
    },
    1200:{
        items:3
    },
    1700:{
      items:4
    },

  }, dots: true, nav: false}; 
}
