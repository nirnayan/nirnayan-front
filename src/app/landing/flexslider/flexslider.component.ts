import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 

@Component({
  selector: 'app-flexslider',
  templateUrl: './flexslider.component.html',
  styleUrls: ['./flexslider.component.css']
})
export class FlexsliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
