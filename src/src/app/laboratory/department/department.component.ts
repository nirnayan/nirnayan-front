import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
declare var $: any;


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
    var str = $( this );
    $(document).ready(function(){
      $(".stpRow .mat-expansion-panel .mat-expansion-panel-header").click(function(){
        $(this).parent().parent('.stpRow').toggleClass('sptxt');
        $(this).parent().parent().siblings().removeClass('sptxt');
      });
      
      $(".accreBoxRow").click(function(){
        $(this).toggleClass('accreAct');
        $(this).siblings().removeClass('accreAct');
      });
    });
  }
  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    600:{
      items:2
    },
    900:{
        items:2.7
    },

  }, dots: true, nav: false}; 
}
