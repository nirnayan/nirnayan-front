import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-menu-slide',
  templateUrl: './patient-menu-slide.component.html',
  styleUrls: ['./patient-menu-slide.component.css']
})
export class PatientMenuSlideComponent implements OnInit {

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

  }, dots: false, nav: false};  

}
