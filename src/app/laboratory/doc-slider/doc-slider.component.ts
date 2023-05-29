import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-doc-slider',
  templateUrl: './doc-slider.component.html',
  styleUrls: ['./doc-slider.component.css']
})
export class DocSliderComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    AOS.init();
  }

  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:false,
    pullDrag: false,
    center: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
}
