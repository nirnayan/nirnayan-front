import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-blogg',
  templateUrl: './blogg.component.html',
  styleUrls: ['./blogg.component.css']
})
export class BloggComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
