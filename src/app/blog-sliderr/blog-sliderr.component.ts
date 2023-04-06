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
      items:1
  },
  650:{
      items:2
  },
  1050:{
    items:3
  },
  1500:{
    items:4
  },

  }, dots: true, nav: false}; 
}
