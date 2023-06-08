import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
declare var $: any;


@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
  
      if (scroll >= 800) {
          $(".tlMiddleBr").addClass("fxd");
          $(".tstLst").addClass("fxdd");
          $(".tlMiddle").addClass("scrll");
          $(".tstTopSec").addClass("fixx");
      } else {
          $(".tlMiddleBr").removeClass("fxd");
          $(".tstLst").removeClass("fxdd");
          $(".tlMiddle").removeClass("scrll");
          $(".tstTopSec").removeClass("fixx");
      }
    });
  }

  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    950:{
      items:2
    },
  }, dots: true, nav: false}; 

  SlideOption = { responsive:{
    0:{
        items:2
    },
    400:{
      items:3
    },
    800:{
      items:5
    },
    1300:{
      items:6
    },
    1400:{
        items:8
    },
    1450:{
      items:10
    },
  }, dots: true, nav: false}; 
}
