import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
