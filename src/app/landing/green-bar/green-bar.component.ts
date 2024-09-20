import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-green-bar',
  templateUrl: './green-bar.component.html',
  styleUrls: ['./green-bar.component.css'],

})
export class GreenBarComponent implements OnInit {

  constructor(
     @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
     
     ) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      
    }
  }

}
