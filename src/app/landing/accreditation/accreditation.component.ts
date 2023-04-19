import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
declare var $: any;

@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.css']
})
export class AccreditationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
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
