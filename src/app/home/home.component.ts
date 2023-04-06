import { Component, OnInit } from '@angular/core';

import * as Aos from 'aos';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = 'Jquery Integration With Angular!';  
  isJqueryWorking: any;  
  constructor() { }

  ngOnInit(): void {
    Aos.init();
    $(document).ready(() => {  
      this.isJqueryWorking = 'Jquery is working !!!';  
      console.log(this.isJqueryWorking)
    });
  }

}
