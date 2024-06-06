import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  selectedTag:any;
  currentRoute: string;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (this.router.url.includes('/about-us/about/mission')) {
        this.currentRoute = 'mission';
      } else if (this.router.url.includes('/about-us/about/vision')) {
        this.currentRoute = 'vision';
      } else if (this.router.url.includes('/about-us/about/value')) {
        this.currentRoute = 'value';
      }
    });
  }

}
