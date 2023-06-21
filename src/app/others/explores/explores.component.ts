import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-explores',
  templateUrl: './explores.component.html',
  styleUrls: ['./explores.component.css']
})
export class ExploresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.country .growScrollRow').on('click', function() {
        $('.growthSec').toggleClass("animt");
      });
      $('.state .growScrollRow').on('click', function() {
        $('.growthSec').toggleClass("animtt");
      });
      $('.distric .growScrollRow').on('click', function() {
        $('.growthSec').toggleClass("animmt");
      });
    });
  }

}
