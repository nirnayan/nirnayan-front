import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depart-slider',
  templateUrl: './depart-slider.component.html',
  styleUrls: ['./depart-slider.component.css']
})
export class DepartSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  SlideOptions = { responsive:{
    0:{
        items:2.5
    },
    600:{
        items:2.5
    },
    

}, dots: true, nav: false, center: true, loop: true,}; 
}
