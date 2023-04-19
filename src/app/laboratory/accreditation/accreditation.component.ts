import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';
// import * as $ from 'jquery'; 
declare var test: any;
import AOS from 'aos'; 
declare var $: any;


@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.css']
})
export class AccreditationComponent implements OnInit {

  window:any;
  constructor(
    private router: Router, private activatedRoute: ActivatedRoute
  ) { 
 

  }

  
  f(){
    new test();
  }

  ngOnInit(): void {
    AOS.init();
    this.refreshComponent()
    console.log('refresh')
  }

  refreshComponent(){
    console.log('refresh refresh')
    this.router.navigate([this.router.url])
 }

}
