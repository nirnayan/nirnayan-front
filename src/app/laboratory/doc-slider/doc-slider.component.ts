import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-doc-slider',
  templateUrl: './doc-slider.component.html',
  styleUrls: ['./doc-slider.component.css']
})
export class DocSliderComponent implements OnInit {

  constructor() { AOS.init();}

  ngOnInit(): void {
  }

  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    pullDrag: false,
    center: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
