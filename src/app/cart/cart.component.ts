import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
