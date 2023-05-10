import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';
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

  window:any;
  pageContent:any;




  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private _master: MasterService) { }

  
  f(){
    new test();
  }

  ngOnInit(): void {
    AOS.init();
    this.refreshComponent()
    this.getPage();
  }

  refreshComponent(){
    this.router.navigate([this.router.url])
 }

  getPage() {
    this._master.getPageContent().subscribe((res:any) => {
      let pageItem = [];
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        if(element.name == 'Accreditation') {
          pageItem.push(element)
        }
      }
      this.pageContent = pageItem[0];
    })
  }

 customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  autoplay:false,
  pullDrag: false,
  center: true,
  dots: true,
  navSpeed: 10,
  navText: ['', ''],
  responsive: {
    0: {
      items: 3
    }
  },
  nav: true
}

SlideOptionn = { responsive:{
  0:{
      items:1
  },
  600:{
    items:1
  },
  750:{
      items:2
  },
  1250:{
    items:3
  },
  1650:{
    items:4
  },

}, dots: true, nav: false, center: true,}; 
}
