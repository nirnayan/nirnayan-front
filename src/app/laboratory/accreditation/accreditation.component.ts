import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
// import * as $ from 'jquery'; 
declare var test: any;
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
  logos: any[] = [1, 2, 3]



  constructor(private _master: MasterService) { }


  f() {
    new test();
  }

  ngOnInit(): void {
    AOS.init();
    this._master.getAllaccred().subscribe((res: any) => {
      if (res.message == 'Success') {
        let accred = [];
        for (let item of res.data) {
          if (item.status == 1) {
            accred.push(item);
          }
        }
        this.accreditation = accred;
        this.accrDetails(accred[0])
      }
    })

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
  }

  accrDetails(item: any) {
    this.itemDetails = item;
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
        items: 1, // 2 items for mobile devices
      },
      768: {
        items: 1, // 3 items for tablets
      },
      900: {
        items: 1, // 5 items for larger screens
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
}
