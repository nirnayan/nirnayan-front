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
    return this._http.post(this.ApiBaseUrl+'/user/addNewPatient',data)
  }
  getPatient(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/getAllPatients',data)
  }

  getPatientById(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/getPatientById',data)
  }

  updatePatients(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/editPatient',data)
  }
  deletePatient(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/deletePatient',data)
  }

  
  getBloodGroup() {
    return this._http.get(this.ApiBaseUrlLims+'global/getBloodGroup')
  }

  // Location
  getAlllocations(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/getAllLocations',data)
  }
}
