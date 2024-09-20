import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-menu-slide',
  templateUrl: './patient-menu-slide.component.html',
  styleUrls: ['./patient-menu-slide.component.css']
})
export class PatientMenuSlideComponent implements OnInit {

  constructor(
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {}
  }
  
  SlideOptions = { responsive:{
    0:{
        items:2
    },
    600:{
        items:2
    },

  }, dots: false, nav: false};  

}
