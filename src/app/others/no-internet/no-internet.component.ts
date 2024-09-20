import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserService } from '../../service/browser.service';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.css'],

})
export class NoInternetComponent implements OnInit {
  isOnline: boolean;

  constructor(private browserService: BrowserService) { }

  ngOnInit(): void {
    this.isOnline = this.browserService.isOnline;
    console.log('Is online:', this.isOnline);
  }

  // refreshPage() {
  //   window.addEventListener('online', () => {
  //     this.isOnline = true;
  //     this._router.navigate(['/']);
  //   });

  //   window.addEventListener('offline', () => {
  //     this.isOnline = false;
  //     this._router.navigate(['/others/no-internet']);
  //   });
  // }
}
