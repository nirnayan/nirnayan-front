import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import $ from 'jquery'; // Import jQuery

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],

})
export class ExploreComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      $(document).ready(() => {
        $('.country .growScrollRow').on('click', () => {
          $('.growthSec').toggleClass('animt');
        });

        // Uncomment and adjust as needed
        // $('.state .growScrollRow').on('click', () => {
        //   $('.growthSec').toggleClass('animtt');
        // });
        // $('.distric .growScrollRow').on('click', () => {
        //   $('.growthSec').toggleClass('animmt');
        // });
      });
    }
  }
}
