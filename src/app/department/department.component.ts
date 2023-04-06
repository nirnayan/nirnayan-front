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
      $(".stpRow:first-child .mat-expansion-panel").click(function(){
        $(".stpRow:first-child .mat-expansion-panel").parent('.stpRow').toggleClass('sptxt');
      });
      $(".stpRow:nth-child(2) .mat-expansion-panel").click(function(){
        $(".stpRow:nth-child(2) .mat-expansion-panel").parent('.stpRow').toggleClass('sptxt');
      });
      $(".stpRow:nth-child(3) .mat-expansion-panel").click(function(){
        $(".stpRow:nth-child(3) .mat-expansion-panel").parent('.stpRow').toggleClass('sptxt');
      });
      $(".stpRow:nth-child(4) .mat-expansion-panel").click(function(){
        $(".stpRow:nth-child(4) .mat-expansion-panel").parent('.stpRow').toggleClass('sptxt');
      });
      $(".stpRow:nth-child(5) .mat-expansion-panel").click(function(){
        $(".stpRow:nth-child(5) .mat-expansion-panel").parent('.stpRow').toggleClass('sptxt');
      });
      $(".stpRow:nth-child(6) .mat-expansion-panel").click(function(){
        $(".stpRow:nth-child(6) .mat-expansion-panel").parent('.stpRow').toggleClass('sptxt');
      });
      $(".accreBoxRow:first-child").click(function(){
        $(".accreBoxRow:first-child").toggleClass('accreAct');
        $(".accreBoxRow:nth-child(4)").removeClass('accreAct');
        $(".accreBoxRow:nth-child(3)").removeClass('accreAct');
        $(".accreBoxRow:nth-child(2)").removeClass('accreAct');
      });
      $(".accreBoxRow:nth-child(2)").click(function(){
        $(".accreBoxRow:nth-child(2)").toggleClass('accreAct');
        $(".accreBoxRow:first-child").removeClass('accreAct');
        $(".accreBoxRow:nth-child(4)").removeClass('accreAct');
        $(".accreBoxRow:nth-child(3)").removeClass('accreAct');
      });
      $(".accreBoxRow:nth-child(3)").click(function(){
        $(".accreBoxRow:nth-child(3)").toggleClass('accreAct');
        $(".accreBoxRow:first-child").removeClass('accreAct');
        $(".accreBoxRow:nth-child(2)").removeClass('accreAct');
        $(".accreBoxRow:nth-child(4)").removeClass('accreAct');
      });
      $(".accreBoxRow:nth-child(4)").click(function(){
        $(".accreBoxRow:nth-child(4)").toggleClass('accreAct');
        $(".accreBoxRow:first-child").removeClass('accreAct');
        $(".accreBoxRow:nth-child(2)").removeClass('accreAct');
        $(".accreBoxRow:nth-child(3)").removeClass('accreAct');
      });
    });
  }
  SlideOptionn = { responsive:{
    0:{
        items:2
    },
    600:{
        items:2.7
    },

  }, dots: true, nav: false}; 
}
