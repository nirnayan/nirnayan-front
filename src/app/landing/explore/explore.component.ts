import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

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
