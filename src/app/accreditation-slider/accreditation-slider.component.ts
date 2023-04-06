import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';
import * as $ from 'jquery'; 
declare var test: any;

@Component({
  selector: 'app-accreditation-slider',
  templateUrl: './accreditation-slider.component.html',
  styleUrls: ['./accreditation-slider.component.css']
})
export class AccreditationSliderComponent implements OnInit {

window:any;
  constructor(
    private router: Router, private activatedRoute: ActivatedRoute
  ) { 
 

  }

  
  f(){
    new test();
  }

  ngOnInit(): void {
    this.refreshComponent()
    console.log('refresh')
  }

  refreshComponent(){
    console.log('refresh refresh')
    this.router.navigate([this.router.url])
 }
//  public loadScript() {
//   let body = <HTMLDivElement> document.body;
//   let script = document.createElement('script');
//   script.innerHTML = '';
//   script.src = 'https://code.jquery.com/jquery-3.3.1.slim.min.js';
//   script.async = true;
//   script.defer = true;
//   body.appendChild(script);
//   this.loadScript1();
// }

// public loadScript1() {
//   let body = <HTMLDivElement> document.body;
//   let script = document.createElement('script');
//   script.innerHTML = '';
//   script.src = 'assets/js/card-slider-min.js';
//   script.async = true;
//   script.defer = true;
//   body.appendChild(script);
//   this.loadScript2();
// }
// public loadScript2() {
//   let body = <HTMLDivElement> document.body;
//   let script = document.createElement('script');
//   script.innerHTML = '';
//   script.src = 'assets/js/cardsliderall.js';
//   script.async = true;
//   script.defer = true;
//   body.appendChild(script);
// }

}
