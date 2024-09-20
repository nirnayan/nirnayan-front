import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser for SSR

@Component({
  selector: 'app-explores',
  templateUrl: './explores.component.html',
  styleUrls: ['./explores.component.css'],

})
export class ExploresComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // jQuery code runs only in the browser
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
}
