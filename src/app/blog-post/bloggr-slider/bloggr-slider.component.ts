import { Component, OnInit } from '@angular/core';
import AOS from 'aos';


@Component({
  selector: 'app-bloggr-slider',
  templateUrl: './bloggr-slider.component.html',
  styleUrls: ['./bloggr-slider.component.css']
})
export class BloggrSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }
  blgSlideOption = { responsive:{
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
