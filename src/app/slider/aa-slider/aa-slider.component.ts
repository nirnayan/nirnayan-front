import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-aa-slider',
  templateUrl: './aa-slider.component.html',
  styleUrls: ['./aa-slider.component.css']
})
export class AaSliderComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      
    }
  }
  SlideOptions = { responsive:{
    0:{
        items:2.6
    },
    600:{
        items:2.6
    },

  }, dots: true, nav: false, center: true, loop: true, };  
}
