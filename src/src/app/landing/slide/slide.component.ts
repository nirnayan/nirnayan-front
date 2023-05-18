import { Component, OnInit } from '@angular/core';
declare var $: any;
import AOS from 'aos'; 

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }
  SlideOptions = { responsive:{
    0:{
        items:1
    },
    600:{
        items:2
    },
    900:{
      items:3
    },
    1000:{
      items:4
    },
    1200:{
      items:4
    },
    1600:{
      items:5
    },
    1800:{
        items:5
    }
}, dots: false, nav: true };  
  CarouselOptions = { responsive:{
    0:{
        items:1
    },
    600:{
      items:2
    },
    900:{
      items:3
    },
    1000:{
      items:4
    },
    1200:{
      items:4
    },
    1600:{
      items:5
    },
    1800:{
        items:5
    }
}, dots: false, nav: true }; 

}
