import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private BesUrl = environment.apiEndpointBase;
  constructor(private _http: HttpClient) { }

  getallBlog() {
    return this._http.get(this.BesUrl + 'blog/getall');
  };

  getallAccred() {
    return this._http.get(this.BesUrl + 'accrediation/getall');
  };
}
