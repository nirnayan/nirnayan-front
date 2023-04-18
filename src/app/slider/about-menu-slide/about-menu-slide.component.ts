import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-menu-slide',
  templateUrl: './about-menu-slide.component.html',
  styleUrls: ['./about-menu-slide.component.css']
})
export class AboutMenuSlideComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  SlideOptions = { responsive:{
    0:{
        items:2
    },
    600:{
        items:2
    },

  }, dots: true, nav: false}; 

  aboutUs() {
    this._router.navigate(['/about-us/about'])
  }
}
