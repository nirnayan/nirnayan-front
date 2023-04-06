import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-quality-assurance',
  templateUrl: './quality-assurance.component.html',
  styleUrls: ['./quality-assurance.component.css']
})
export class QualityAssuranceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
