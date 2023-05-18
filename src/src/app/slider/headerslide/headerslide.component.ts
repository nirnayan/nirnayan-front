import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headerslide',
  templateUrl: './headerslide.component.html',
  styleUrls: ['./headerslide.component.css']
})
export class HeaderslideComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  SlideOptions = { responsive:{
    0:{
        items:2
    },
    600:{
        items:2
    },

}, dots: true, nav: false};  


redirect() {
  this._router.navigate(['/laboratory/department']);

  // setTimeout(() => {
  //   window.location.reload()
  // }, 500);
  
}
}
