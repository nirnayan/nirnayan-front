import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private BesUrl = environment.apiEndpointBase;
  constructor(private _http: HttpClient) { }

  getPageContent() {
    return this._http.get(this.BesUrl + 'page/getall');
  };
}
