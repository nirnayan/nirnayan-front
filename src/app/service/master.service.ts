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

  getAllBlogs(data:any):Observable<any> {
    return this._http.post(this.BesUrl + 'blog/getCategoryWiseBlogs', data);
  };

  getDepartments():Observable<any> {
    return this._http.get(this.BesUrl + 'department/getAll');
  };

  
  getDoctors(data:any):Observable<any> {
    return this._http.post(this.BesUrl + 'department/getMembersByDepartment', data);
  };

  contectUs(data:any):Observable<any> {
    return this._http.post(this.BesUrl + 'contactUs/save', data);
  };

  getGallery(data:any):Observable<any> {
    return this._http.post(this.BesUrl + 'gallery/getByDepartment', data);
  };

  getBlogsById(data:any):Observable<any> {
    return this._http.post(this.BesUrl + 'blog/getById', data);
  };

  getAllaccred():Observable<any> {
    return this._http.get(this.BesUrl + 'accrediation/getall');
  };

  getBlogs():Observable<any> {
    return this._http.get(this.BesUrl + 'blog/getall');
  };

  getAccred():Observable<any> {
    return this._http.get(this.BesUrl + 'accrediation/getHomePageData');
  };

  getPostByCat(data:any):Observable<any> {
    return this._http.post(this.BesUrl + 'post/getPostsByCategory',data);
  };

  getEmpByCode(data:any):Observable<any> {
    return this._http.post(this.BesUrl + 'employee/getByEmployeeCode',data);
  };
}
