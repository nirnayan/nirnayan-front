import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-test-reference',
  templateUrl: './test-reference.component.html',
  styleUrls: ['./test-reference.component.css']
})
export class TestReferenceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
