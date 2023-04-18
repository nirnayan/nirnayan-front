import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
declare var $: any;


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
