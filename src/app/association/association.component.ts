import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
