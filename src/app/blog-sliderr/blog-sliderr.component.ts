import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-blog-sliderr',
  templateUrl: './blog-sliderr.component.html',
  styleUrls: ['./blog-sliderr.component.css']
})
export class BlogSliderrComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }
  blgSlideOption = { responsive:{
    0:{
        items:2
    },
    600:{
        items:4
    },

  }, dots: true, nav: false}; 
}
