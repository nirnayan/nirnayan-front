import { Component, OnInit } from '@angular/core';
import AOS from 'aos';


@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css']
})
export class QualityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // $('body').removeClass('mat-typography');
    AOS.init();
  }

  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    600:{
      items:2
    },
    750:{
        items:3
    },

  }, dots: true, nav: false}; 
}
