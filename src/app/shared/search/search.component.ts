import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  constructor(private _master:MasterService) { }
  ngOnInit(): void {
  }
}