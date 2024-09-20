import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-depart-slider',
  templateUrl: './depart-slider.component.html',
  styleUrls: ['./depart-slider.component.css'],

})
export class DepartSliderComponent implements OnInit {

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Ensure slider functionality is only initialized in the browser
    if (this.isBrowser) {
      this.initializeSlider();
    }
  }

  SlideOptions = {
    responsive: {
      0: {
        items: 2.5
      },
      600: {
        items: 2.5
      }
    },
    dots: true,
    nav: false,
    center: true,
    loop: true,
  };

  initializeSlider() {
    // Initialize or configure your slider here if needed
    // Ensure any code that depends on the browser environment is executed here
  }
}
