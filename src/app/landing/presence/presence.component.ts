import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.country .growScrollRow').on('click', function() {
        $('.growthSec').toggleClass("animt");
      });
      // $('.state .growScrollRow').on('click', function() {
      //   $('.growthSec').toggleClass("animtt");
      // });
      // $('.distric .growScrollRow').on('click', function() {
      //   $('.growthSec').toggleClass("animmt");
      // });
    });
  }

}
