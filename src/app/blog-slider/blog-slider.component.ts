import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-blog-slider',
  templateUrl: './blog-slider.component.html',
  styleUrls: ['./blog-slider.component.css']
})
export class BlogSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }
  SlideOptions = { responsive:{
    0:{
        items:1
    },
    650:{
        items:2
    },
    1050:{
      items:3
    },
    1500:{
      items:4
    },

  }, dots: true, nav: false}; 
}
