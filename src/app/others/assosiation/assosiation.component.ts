import { Component, OnInit } from '@angular/core';
import AOS from 'aos';


@Component({
  selector: 'app-assosiation',
  templateUrl: './assosiation.component.html',
  styleUrls: ['./assosiation.component.css']
})
export class AssosiationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
