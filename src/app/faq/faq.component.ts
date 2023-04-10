import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
