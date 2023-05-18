import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';
// import * as $ from 'jquery'; 
declare var test: any;
import AOS from 'aos'; 
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;


@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.css']
})
export class AccreditationComponent implements OnInit {

  window:any;
  constructor(
    private router: Router, private activatedRoute: ActivatedRoute
  ) { 
 

  }

  
  f(){
    new test();
  }

  ngOnInit(): void {
    AOS.init();
    this.refreshComponent()
  }

  refreshComponent(){
    this.router.navigate([this.router.url])
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
