import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search_result:any = [];
  constructor(private _master:MasterService) { }
  ngOnInit(): void {}
  search(event:any){
    const search_key = (document.getElementById("search-input") as HTMLInputElement).value;
    this._master.getSearchResult(search_key).subscribe((response) => {
      this.search_result = response.data;
    });
  }
}