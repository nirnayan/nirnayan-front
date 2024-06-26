import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
// import * as $ from 'jquery'; 
declare var test: any;
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BlogService } from 'src/app/service/blog.service';
import { MasterService } from 'src/app/service/master.service';
declare var $: any;


@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.css']
})
export class AccreditationComponent implements OnInit {

  accreditation: any = [];
  window: any;
  pageItem: any = [];
  itemDetails: any
  logos: any[] = []
  selectedItem:any
  selectedItemId: any;
  allAccred: any=[];


  constructor(
    private _master: MasterService,
    private _blog: BlogService,
    private router:Router
  ) { }


  f() {
    new test();
  }

  ngOnInit(): void {
    AOS.init();
    this._master.getPageContent().subscribe((res: any) => {
      let page = [];
      if (res.message == 'Success') {
        for (let item of res.data) {
          if (item.id == 6) {
            page.push(item)
          }
        }
        this.pageItem = page;
        $("#loader").hide();
      }
    })

    this._blog.getallAccred().subscribe((res:any) => {
      if(res.message == 'Success') {
        this.allAccred = res.data;
        for(let item of this.allAccred) {
          if(item.status == 1) {
            this.logos.push(item);
          }
        }
        this.showContent(this.logos[0])
        // console.log(this.isPublish)
      }
    })
    
  }

  acctdItem:any = null
  showItem(item:any):void {
    this.acctdItem = item
  }

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 400,
    nav: false,
    navText: ["", ""],
    center: false,
    startPosition: 0,
    items: 4,
    responsive: {
      0: {
        items: 3, // 2 items for mobile devices
      },
      400: {
        items: 3
      },
      768: {
        items: 3, // 3 items for tablets
      },
      900: {
        items: 3, // 5 items for larger screens
      },
    },
  };

  SlideOptionn = {
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      750: {
        items: 2
      },
      1250: {
        items: 3
      },
      1650: {
        items: 4
      },

    }, dots: true, nav: false, center: true,
  };

  showContent(item: any) {
    this.selectedItem = item;
    if (this.selectedItem) {
      this.selectedItemId = this.selectedItem.id;
    }
  }
  
}
