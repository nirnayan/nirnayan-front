import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
declare var $: any;


@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  ngOnInit(): void {

      AOS.init();
  
      $(document).ready(function() {
        $('.careerBottomLft ul li .knowMore').on('click', function() {
          $(this).parent().parent().toggleClass("active");
          $(this).parent().parent().siblings().removeClass("active");
        });
      })
  }
    SlideOptionn = { responsive:{
      0:{
          items:1
      },
      600:{
        items:2
      },
      750:{
          items:4
      },
  
    }, dots: true, nav: false}; 

    // $(document).ready(function() {
    //   $('.careerBottomLft ul li:first-child .knowMore').on('click', function() {
    //     $('.careerBottomLft ul li:nth-child(2)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(3)').removeClass("active");
    //     $('.careerBottomLft ul li:first-child').toggleClass("active");
    //     $('.careerBottomLft ul li:nth-child(4)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(5)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(6)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(7)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(8)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(9)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(10)').removeClass("active");
    //   });
    //   $('.careerBottomLft ul li:nth-child(2) .knowMore').on('click', function() {
    //     $('.careerBottomLft ul li:nth-child(2)').toggleClass("active");
    //     $('.careerBottomLft ul li:nth-child(3)').removeClass("active");
    //     $('.careerBottomLft ul li:first-child').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(4)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(5)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(6)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(7)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(8)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(9)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(10)').removeClass("active");
    //   });
    //   $('.careerBottomLft ul li:nth-child(3) .knowMore').on('click', function() {
    //     $('.careerBottomLft ul li:nth-child(3)').toggleClass("active");
    //     $('.careerBottomLft ul li:nth-child(2)').removeClass("active");
    //     $('.careerBottomLft ul li:first-child').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(4)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(5)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(6)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(7)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(8)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(9)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(10)').removeClass("active");
    //   });
    //   $('.careerBottomLft ul li:nth-child(4) .knowMore').on('click', function() {
    //     $('.careerBottomLft ul li:nth-child(4)').toggleClass("active");
    //     $('.careerBottomLft ul li:nth-child(3)').removeClass("active");
    //     $('.careerBottomLft ul li:first-child').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(2)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(5)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(6)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(7)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(8)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(9)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(10)').removeClass("active");
    //   });
    //   $('.careerBottomLft ul li:nth-child(5) .knowMore').on('click', function() {
    //     $('.careerBottomLft ul li:nth-child(5)').toggleClass("active");
    //     $('.careerBottomLft ul li:nth-child(3)').removeClass("active");
    //     $('.careerBottomLft ul li:first-child').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(4)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(2)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(6)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(7)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(8)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(9)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(10)').removeClass("active");
    //   });
    //   $('.careerBottomLft ul li:nth-child(6) .knowMore').on('click', function() {
    //     $('.careerBottomLft ul li:nth-child(6)').toggleClass("active");
    //     $('.careerBottomLft ul li:nth-child(3)').removeClass("active");
    //     $('.careerBottomLft ul li:first-child').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(4)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(5)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(2)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(7)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(8)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(9)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(10)').removeClass("active");
    //   });
    //   $('.careerBottomLft ul li:nth-child(7) .knowMore').on('click', function() {
    //     $('.careerBottomLft ul li:nth-child(7)').toggleClass("active");
    //     $('.careerBottomLft ul li:nth-child(3)').removeClass("active");
    //     $('.careerBottomLft ul li:first-child').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(4)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(5)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(6)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(2)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(8)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(9)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(10)').removeClass("active");
    //   });
    //   $('.careerBottomLft ul li:nth-child(8) .knowMore').on('click', function() {
    //     $('.careerBottomLft ul li:nth-child(8)').toggleClass("active");
    //     $('.careerBottomLft ul li:nth-child(3)').removeClass("active");
    //     $('.careerBottomLft ul li:first-child').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(4)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(5)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(6)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(7)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(2)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(9)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(10)').removeClass("active");
    //   });
    //   $('.careerBottomLft ul li:nth-child(9) .knowMore').on('click', function() {
    //     $('.careerBottomLft ul li:nth-child(9)').toggleClass("active");
    //     $('.careerBottomLft ul li:nth-child(3)').removeClass("active");
    //     $('.careerBottomLft ul li:first-child').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(4)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(5)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(6)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(7)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(8)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(2)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(10)').removeClass("active");
    //   });
    //   $('.careerBottomLft ul li:nth-child(10) .knowMore').on('click', function() {
    //     $('.careerBottomLft ul li:nth-child(10)').toggleClass("active");
    //     $('.careerBottomLft ul li:nth-child(3)').removeClass("active");
    //     $('.careerBottomLft ul li:first-child').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(4)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(5)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(6)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(7)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(8)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(9)').removeClass("active");
    //     $('.careerBottomLft ul li:nth-child(2)').removeClass("active");
    //   });
    // })
  
  // SlideOptionn = { responsive:{
  //   0:{
  //       items:1
  //   },
  //   600:{
  //     items:2
  //   },
  //   750:{
  //       items:4
  //   },

  // }, dots: true, nav: false}; 
}
