import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos'; 

@Component({
  selector: 'app-flexslider',
  templateUrl: './flexslider.component.html',
  styleUrls: ['./flexslider.component.css']
})
export class FlexsliderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    AOS.init();

  }

  
}
