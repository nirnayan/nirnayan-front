import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }
}
