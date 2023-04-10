import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-quality-assurance',
  templateUrl: './quality-assurance.component.html',
  styleUrls: ['./quality-assurance.component.css']
})
export class QualityAssuranceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
