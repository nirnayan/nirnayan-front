import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 

@Component({
  selector: 'app-find-center',
  templateUrl: './find-center.component.html',
  styleUrls: ['./find-center.component.css']
})
export class FindCenterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }
  
}
