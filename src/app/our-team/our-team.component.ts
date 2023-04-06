import { Component, OnInit } from '@angular/core';
declare var $: any; 

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css']
})
export class OurTeamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.teamTopButton span:first-child').on('click', function() {
        $('.teamMemberInner:first-child').addClass('active');
        $('.teamTopButton span:first-child').addClass('active');
        $('.teamMemberInner:nth-child(2)').removeClass('active');
        $('.teamTopButton span:nth-child(2)').removeClass('active');
      });
      $('.teamTopButton span:nth-child(2)').on('click', function() {
        $('.teamMemberInner:nth-child(2)').addClass('active');
        $('.teamTopButton span:nth-child(2)').addClass('active');
        $('.teamMemberInner:first-child').removeClass('active');
        $('.teamTopButton span:first-child').removeClass('active');
      });
    });
  }

}
