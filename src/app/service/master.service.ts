import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private BesUrl = environment.apiEndpointBase;
  private BesPathB2c = environment.BaseApiUrl;
  private BesLimsPath = environment.BaseLimsApiUrl;
  private subject = new BehaviorSubject<string>('');
  airtelUrl = 'https://digimate.airtel.in:15443/BULK_API/InstantJsonPush'
  private activeIndex: number = null;

  constructor(private _http: HttpClient) { }

  setActiveIndex(index: number) {
    this.activeIndex = index;
  }

  getActiveIndex() {
    return this.activeIndex;
  }

  sendData(data: string) {
    this.subject.next(data)
  };

  receiveData(): Observable<string> {
    return this.subject.asObservable();
  };

  sharePriceInfo(data2: string) {
    this.subject.next(data2)
  };

  receivePriceInfo(): Observable<string> {
    return this.subject.asObservable();
  };


  getPageContent(): Observable<any> {
    return this._http.get(this.BesUrl + 'page/getall');
  };

  getBannerContent(data: any): Observable<any> {
    const url = `${this.BesLimsPath}b2c/advertisement/getAllVisibleAdvertisements?baner_type=${data}`;
    return this._http.get(url);
  };
  uploadPrescription(data: any) {
    return this._http.post(this.BesLimsPath + 'b2c/user/prescription/addNewPrescriptionQuery', data)
  }
  getAllPost(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'post/getPostsByCategory', data);
  };

  blogListItem: any
  getAllBlogs(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'blog/getCategoryWiseBlogs', data);
  };

  getDepartments(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'department/getAll', data);
  };


  getDoctors(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'department/getMembersByDepartment', data);
  };
  getTestById(id: any, state: any): Observable<any> {
    const url = `${this.BesLimsPath}global/test/test-master/getTestDetails?id=${id}&state=${state}`;
    return this._http.get(url);
  }
  contectUs(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'contactUs/save', data);
  };

  getGallery(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'gallery/getByDepartment', data);
  };


  getAllaccred(): Observable<any> {
    return this._http.get(this.BesUrl + 'accrediation/getall');
  };

  blogPostItem: any
  getBlogs(): Observable<any> {
    return this._http.get(this.BesLimsPath + 'b2c/getAllBlogs');
  };

  getAllBlogCategory():Observable<any>{
    return this._http.get(this.BesLimsPath + 'b2c/getBlogCategories')
  }
  
  getAllBlogCategoryFilter(data:any):Observable<any>{
    return this._http.get(this.BesLimsPath + `b2c/filterBlogByCategory?cat=${data}`)
  }

  getBlogsById(data: any): Observable<any> {
    return this._http.post(this.BesLimsPath + 'b2c/viewBlog ', data);
  };
  
  getAccred(): Observable<any> {
    return this._http.get(this.BesUrl + 'accrediation/getHomePageData');
  };

  bannerItem: any
  getPostByCat(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'post/getPostsByCategory', data);
  };

  getEmpByCode(data: any): Observable<any> {
    return this._http.post(this.BesLimsPath + 'global/employee/getByEmployeeCode', data);
  };

  testMasterItem: any
  getTestMaster(): Observable<any> {
    return this._http.get(this.BesUrl + 'test/getHomePageTests');
  };

  getDetailsByTestId(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'test/getById', data);
  };

  packageItem: any
  getPackageMaster(): Observable<any> {
    return this._http.get(this.BesUrl + 'package/getAll/?env=user');
  };
  // Get All Groups
  getAllGroups(data: any): Observable<any> {
    return this._http.post(`${this.BesUrl}test/getTestListGroups`, data);
  };

  // Get All Tests
  testMasterAllItem: any
  getAllGroupTests(data: any): Observable<any> {
    return this._http.post(`${this.BesUrl}test/getTestListTests`, data);
  };

  // Get Specific Group Tests
  getSpecificGroupTests(data: any): Observable<any> {
    return this._http.post(`${this.BesUrl}test/getSpecificGroupTests`, data);
  };

  // group for encyclopedia
  getGroupMaster(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'encyclopedia/getAllGroups', data);
  };

  encyclopediaItem: any
  getGroupWiseItem(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'encyclopedia/getSpecificGroupData', data);
  };

  // Search
  getSearchResult(search_key: String): Observable<any> {
    return this._http.get(`${this.BesUrl}search/?q=${search_key}`);
  };

  getJobsPost(): Observable<any> {
    return this._http.get(this.BesUrl + 'careers/getAllPosting');
  };

  storeEnquiry(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'careers/saveEnquiry', data);
  };

  storeContactUs(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'contactUs/save', data);
  };

  // Center
  getCenter(): Observable<any> {
    return this._http.get(this.BesUrl + 'centre/getAllCentres');
  };

  getAllTests(): Observable<any> {
    return this._http.get(`${this.BesUrl}test/getAll`);
  };

  getTestReferenceData(): Observable<any> {
    return this._http.get(`${this.BesUrl}search/getTestReferenceData`);
  };

  getTestSearchResults(data: any): Observable<any> {
    return this._http.post(`${this.BesUrl}search/getTestSearchResult`, data);
  };

  getGroupDepartWiseTestReference(data: any): Observable<any> {
    return this._http.post(`${this.BesUrl}search/getTestByDepartment`, data);
  };

  packageListItem: any
  getpackages(data: any): Observable<any> {
    return this._http.post(`${this.BesUrl}package/getPackageListPackages`, data);
  };

  getSpecificPackages(data: any): Observable<any> {
    return this._http.post(`${this.BesUrl}package/getSpecificGroupTests`, data);
  };

  getPackageById(data: any): Observable<any> {
    return this._http.post(`${this.BesUrl}package/getById`, data);
  };

  storeSubscription(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'contactUs/newsletter_subscription', data);
  };

  storeBookingEnqury(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'contactUs/booking_enquiry', data);
  };

  getEvents(): Observable<any> {
    return this._http.get(this.BesUrl + 'events/getAll?q=user')
  }

  getEventsById(data: any): Observable<any> {
    return this._http.post(this.BesUrl + 'events/getById', data)
  }

  // Silent Login
  getEmailOtp(data: any): Observable<any> {
    return this._http.post(this.BesPathB2c + 'getEmailOTP', data)
  }

  storeSilentRegister(data: any): Observable<any> {
    return this._http.post(this.BesPathB2c + 'silent-registration', data)
  }

  getAllNewTests(state: number, limit: number, lastId: number, groupId = null,groupTyp: string): Observable<any> {
    const url = `${this.BesLimsPath}global/getHomePageTests?state=${state}&type=test&limit=${limit}&lastId=${lastId}&groupId=${groupId}&groupType=${groupTyp}`;
    return this._http.get(url);
  }
  getAllNewPackages(state: number, limit: number, lastId: number, groupId = null,groupTyp: string): Observable<any> {
    const url = `${this.BesLimsPath}global/getHomePageTests?state=${state}&type=package&limit=${limit}&lastId=${lastId}&groupId=${groupId}&groupType=${groupTyp}`;
    return this._http.get(url);
  }
  getSearchItem(test: number, key: number, state: number, groupId = null): Observable<any> {
    const url = `${this.BesPathB2c}/testListSearch?type=${test}&key=${key}&state=${state}&group=${groupId}`;
    return this._http.get(url);
  }
  getSMS(data: any): Observable<any> {
    return this._http.post(this.airtelUrl, data)
  }
  getSignInOtp(username: any): Observable<any> {
    const url = `${this.BesLimsPath}b2c/requestOTP?email_or_mobile=${username}`;
    return this._http.get(url);
  }
  generateOTP(): string {
    // Generate a random number between 100000 and 999999
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }
  //FeedBack
  getAllFeedback(): Observable<any> {
    return this._http.get(this.BesPathB2c + 'feedback/getAllVisibleFeedbacks')
  }
  //award
  getAllAward():Observable<any>{
    return this._http.get(this.BesLimsPath + 'global/awards/getAllAwards')
  }

  loadedGrops:any = []
  getAllOrganWise(limit:any):Observable<any>{
    return this._http.get(`${this.BesLimsPath}global/getJSON?type=organ&limit=${limit}`)
  }

  getAllConditionWise():Observable<any>{
    return this._http.get(this.BesLimsPath + 'global/getJSON?type=condition')
  }

  getLimsALlGroup(content:any): Observable<any> {
    return this._http.get(`${this.BesLimsPath}global/test/group/getAll?content=${content}`)
  }
  getConditionWise(content:any): Observable<any> {
    return this._http.get(`${this.BesLimsPath}global/test/speciality/getAll?content=${content}`)
  }
//Change Patient Profile Picture
  getChangePatientProfilePicture(data:any):Observable<any>{
    return this._http.post(this.BesPathB2c + 'user/changePatientProfilePicture' , data)
  }

  // SEO Content
  getDataPageById(data:any):Observable<any>{
    return this._http.post(this.BesPathB2c + 'getPageByFrontId' , data)
  }
}
