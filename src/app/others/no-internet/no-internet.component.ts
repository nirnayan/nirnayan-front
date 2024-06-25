import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.css']
})
export class NoInternetComponent implements OnInit {
  isOnline: boolean = navigator.onLine;




  constructor(private _router: Router) { }

  ngOnInit(): void {
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
