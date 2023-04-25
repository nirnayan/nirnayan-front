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
  autoplay:true,
  pullDrag: false,
  center: true,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}
}
