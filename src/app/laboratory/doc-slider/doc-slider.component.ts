import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 

@Component({
  selector: 'app-doc-slider',
  templateUrl: './doc-slider.component.html',
  styleUrls: ['./doc-slider.component.css']
})
export class DocSliderComponent implements OnInit {

  constructor() { AOS.init();}

  ngOnInit(): void {
  }

}
