import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  ApiBaseUrl = environment.BaseApiUrl
  ApiBaseUrlLims = environment.LimsEndpointBase
  private subject = new BehaviorSubject<string>('');

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
    return this._http.post(this.ApiBaseUrl+'/getOTP',data)
  }

  verifyOtp(data:any) {
    return this._http.post(this.ApiBaseUrl+'/verifyOTP',data)
  }
  forgotPassword(data:any) {
    return this._http.post(this.ApiBaseUrl+'/changePassword',data)
  }
  resetPassword(data:any) {
    return this._http.post(this.ApiBaseUrl+'/changePassword',data)
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

  deleteAddr(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/deleteAddress',data)
  }

  addPrescription(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/prescription/addNewPrescriptionQuery',data)
  }

  getPrescription(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/prescription/getMyPrescriptionQueries',data)
  }
  
  deletePrescription(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/prescription/deletePrescriptionQuery',data)
  }
  getPrescriptionByid(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/prescription/getPrescriptionQueryById',data)
  }
  prescriptionMoveToCart(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/prescription/moveToCart',data)
  }

  updateProfile(data:any) {
    return this._http.post(this.ApiBaseUrl+'/user/editUser',data)
  }

  logMeOut() {
    return this._http.get(this.ApiBaseUrl+'/user/logout')
  }

  getProfileData(userid: any) {
    const apiUrl = this.ApiBaseUrl+`/user/getUserData?user=${userid}`;
    return this._http.get(apiUrl);
  }

  sendHeaderImg(qty:string) {
    this.subject.next(qty)
  };

  receiveHeaderImg(): Observable<string> {
    return this.subject.asObservable();
  };
}
