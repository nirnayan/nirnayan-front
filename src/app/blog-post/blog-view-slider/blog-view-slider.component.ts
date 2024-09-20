import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-blog-view-slider',
  templateUrl: './blog-view-slider.component.html',
  styleUrls: ['./blog-view-slider.component.css'],

})
export class BlogViewSliderComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      
    }
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
