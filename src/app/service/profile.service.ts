import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  ApiBaseUrl = environment.BaseApiUrl
  ApiBaseUrlLims = environment.LimsEndpointBase
  constructor(private _http: HttpClient) { }

  storePatient(data:any) {
    return this._http.post(this.ApiBaseUrl+'/patient/addNewPatient',data)
  }
  getPatient(data:any) {
    return this._http.post(this.ApiBaseUrl+'/patient/getAllPatients',data)
  }

  getPatientById(data:any) {
    return this._http.post(this.ApiBaseUrl+'/patient/getPatientById',data)
  }

  updatePatients(data:any) {
    return this._http.post(this.ApiBaseUrl+'/patient/editPatient',data)
  }
  deletePatient(data:any) {
    return this._http.post(this.ApiBaseUrl+'/patient/deletePatient',data)
  }

  // Cart
  getCartList(data:any) {
    return this._http.post(this.ApiBaseUrl+'/patient/getAllCartItems',data)
  }
  addToCart(data:any) {
    return this._http.post(this.ApiBaseUrl+'/patient/addToCart',data)
  }
  
  getBloodGroup() {
    return this._http.get(this.ApiBaseUrlLims+'global/getBloodGroup')
  }
}
