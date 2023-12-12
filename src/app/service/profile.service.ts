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

  patientItem:any
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
  locationItem:any
  getAlllocations(data:any) {
    return this._http.post(this.ApiBaseUrl+'/getAllLocations',data)
  }

  getOtpByemail(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/getOTP',data)
  }

  verifyOtp(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/verifyOTP',data)
  }
  forgotPassword(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/changePassword',data)
  }
  resetPassword(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/changePassword',data)
  }

  // Address
  storeAddress(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/addNewAddress',data)
  }
  
  getAddress(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/getAllAddress',data)
  }

  getAddressById(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/getAddressById',data)
  }

  updateAddress(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/editAddress',data)
  }
  storeProfileImg(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/changeProfilePicture',data)
  }

  profile:any
  getProfileImg(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/getProfilePicture',data)
  }
  getCoins(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/getMyCoins',data)
  }

  getMyOrderItems(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/getMyOrders',data)
  }

  getPastOrder(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/getPastOrders',data)
  }
}
