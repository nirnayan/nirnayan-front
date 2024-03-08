import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
