import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-view-slider',
  templateUrl: './blog-view-slider.component.html',
  styleUrls: ['./blog-view-slider.component.css']
})
export class BlogViewSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
      items:3.4
    },

  }, dots: true, nav: false}; 
}
