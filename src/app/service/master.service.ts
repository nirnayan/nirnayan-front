import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private BesUrl = environment.apiEndpointBase;
  subject: any;
  constructor(private _http: HttpClient) { }


  sendData(rfqNumber:string) {
    this.subject.next(rfqNumber)
  };

  receiveData(): Observable<string> {
    return this.subject.asObservable();
  };

  
  getPageContent():Observable<any> {
    return this._http.get(this.BesUrl + 'page/getall');
  };
  

  getAllPost(data:any):Observable<any> {
    return this._http.post(this.BesUrl + 'post/getPostsByCategory', data);
  };

  getDepartments():Observable<any> {
    return this._http.get(this.BesUrl + 'department/getAll');
  };

  
  getDoctors(data:any):Observable<any> {
    return this._http.post(this.BesUrl + 'department/getMembersByDepartment', data);
  };
}
