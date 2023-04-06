import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
@Component({
  selector: 'app-accreditationn',
  templateUrl: './accreditationn.component.html',
  styleUrls: ['./accreditationn.component.css']
})
export class AccreditationnComponent implements OnInit {

  constructor() { 
    console.log("test")
  
 }

  ngOnInit(): void {
    // window.location.reload();
    AOS.init();
  }

}
