import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerslide',
  templateUrl: './headerslide.component.html',
  styleUrls: ['./headerslide.component.css']
})
export class HeaderslideComponent implements OnInit {

  constructor() { }

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
}
