import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.refreshComponent();

  }

  refreshComponent(){
    this.router.navigate([this.router.url])
 }

}
