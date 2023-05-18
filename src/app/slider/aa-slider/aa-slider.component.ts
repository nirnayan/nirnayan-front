import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aa-slider',
  templateUrl: './aa-slider.component.html',
  styleUrls: ['./aa-slider.component.css']
})
export class AaSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
