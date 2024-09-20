import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about-menu-slide',
  templateUrl: './about-menu-slide.component.html',
  styleUrls: ['./about-menu-slide.component.css']
})
export class AboutMenuSlideComponent implements OnInit {

  selectedTag: any;

  SlideOptions = {
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 2
      },
    },
    dots: true,
    nav: false
  };

  constructor(
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Any browser-specific initialization can go here.
    }
  }

  aboutUs(val: any) {
    this._router.navigate(['/about-us/about', val]);
  }
}
