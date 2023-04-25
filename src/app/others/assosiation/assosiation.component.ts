import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
declare var $: any;


@Component({
  selector: 'app-assosiation',
  templateUrl: './assosiation.component.html',
  styleUrls: ['./assosiation.component.css']
})
export class AssosiationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }
  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    600:{
      items:1
    },
    750:{
        items:2
    },
    1250:{
      items:3
    },
    1650:{
      items:4
    },

  }, dots: true, nav: false}; 
}
