import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
declare var $: any;

@Component({
  selector: 'app-medical-encyclopedia',
  templateUrl: './medical-encyclopedia.component.html',
  styleUrls: ['./medical-encyclopedia.component.css']
})
export class MedicalEncyclopediaComponent implements OnInit {

  ngOnInit(): void {
    AOS.init();
    $(document).ready(function(){
      $(".stpRow:first-child .mat-expansion-panel").click(function(){
        $(".stpRow:first-child .mat-expansion-panel").parent('.stpRow').toggleClass('sgtp');
      });
      $(".stpRow:nth-child(2) .mat-expansion-panel").click(function(){
        $(".stpRow:nth-child(2) .mat-expansion-panel").parent('.stpRow').toggleClass('sgtp');
      });
      $(".stpRow:nth-child(3) .mat-expansion-panel").click(function(){
        $(".stpRow:nth-child(3) .mat-expansion-panel").parent('.stpRow').toggleClass('sgtp');
      });
      $(".stpRow:nth-child(4) .mat-expansion-panel").click(function(){
        $(".stpRow:nth-child(4) .mat-expansion-panel").parent('.stpRow').toggleClass('sgtp');
      });
      $(".stpRow:nth-child(5) .mat-expansion-panel").click(function(){
        $(".stpRow:nth-child(5) .mat-expansion-panel").parent('.stpRow').toggleClass('sgtp');
      });
      $(".stpRow:nth-child(6) .mat-expansion-panel").click(function(){
        $(".stpRow:nth-child(6) .mat-expansion-panel").parent('.stpRow').toggleClass('sgtp');
      });
      // $(".stpRow").click(function(){
      //     if($('.mat-expansion-panel').parent('.stpRow').hasClass('sgtp')){
      //       $('.stpRow').removeClass('sgtp');
      //     }
      //   });
    });
  }

}
