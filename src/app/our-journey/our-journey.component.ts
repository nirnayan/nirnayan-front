import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
declare var $: any;

@Component({
  selector: 'app-our-journey',
  templateUrl: './our-journey.component.html',
  styleUrls: ['./our-journey.component.css']
})
export class OurJourneyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();

    setTimeout(()=>{
      $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 70) {
            $(".journeyAnimate").addClass("startAnimate");
        } else {
            $(".journeyAnimate").removeClass("startAnimate");
        }
      });
      $(document).ready(function() {
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:first-child').addClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(2)').addClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(3)').addClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').addClass("active");
        });
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:first-child').addClass("active");
  
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').addClass("active");
  
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').addClass("active");
  
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').addClass("active");
        });
  
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:first-child').addClass("active");
  
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').addClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').addClass("active");
        });
  
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:first-child').addClass("active");
  
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(2)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(3)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').addClass("active");
        });
  
  
  
  
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:first-child').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').addClass("active");
        });
  
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:first-child').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(2)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(3)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').addClass("active");
        });
  
      });
  
      
    },0)
  }

}
