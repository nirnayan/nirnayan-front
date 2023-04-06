import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
declare var $: any;
@Component({
  selector: 'app-accreditationn',
  templateUrl: './accreditationn.component.html',
  styleUrls: ['./accreditationn.component.css']
})
export class AccreditationnComponent implements OnInit {

  constructor() { 
    console.log("test")
  
 }

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
        console.log('onBeforeMove')
        onMove()
      }
      , onMove: function(slider:any, onAfterMove:any) {
        onAfterMove()
      }
      , onAfterMove: function() {
        console.log('onAfterMove')
      }
      , onAfterTransition: function() {
        console.log('onAfterTransition')
      }
      , onCurrent: function() {
        console.log('onCurrent')
      }
    });
  
    },100)
  }

}
