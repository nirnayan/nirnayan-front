import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
declare var $: any;


@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.css']
})
export class AccreditationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // window.location.reload();
    AOS.init();

    setTimeout(()=>{
      console.log('slider is active')
    $('#slider').cardSlider({
      slideTag: 'div'
      , slideClass: 'slide'
      , current: 1
      , followingClass: 'slider-content-6'
      , delay: 300
      , transition: 'ease'
      , onBeforeMove: function(slider:any, onMove:any) {
        onMove()
      }
      , onMove: function(slider:any, onAfterMove:any) {
        onAfterMove()
      }
      , onAfterMove: function() {
  
      }
      , onAfterTransition: function() {

      }
      , onCurrent: function() {

      }
    });
  
    },100)
  }

  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    800:{
      items:2
    },
    1200:{
        items:3
    },
    1700:{
      items:4
    },

  }, dots: true, nav: false}; 

}
