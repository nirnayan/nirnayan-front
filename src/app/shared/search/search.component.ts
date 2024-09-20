import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search_result: any = [];
  searchQuery: string = '';
  basePath = environment.BaseLimsApiUrl;

  constructor(
    private _master: MasterService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.queryParams.subscribe(params => {
        this.searchQuery = params['q'] || '';
        if (this.searchQuery) {
          this.searchingText({ target: { value: this.searchQuery }});
        }
      });
    }
  }



  searchingText(event:any){
    if (isPlatformBrowser(this.platformId)) {
    // const search_key = (document.getElementById("search-input") as HTMLInputElement).value;
    this._master.getSearchResult(event.target.value).subscribe((response) => {
      this.search_result = response.data;
    });
  }
}
}