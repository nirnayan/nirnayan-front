import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
declare var $: any;
import AOS from 'aos';
import { Observable } from 'rxjs';
import { TestResponse } from 'src/app/Interface/BannerInt';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { IndexedDbService } from 'src/app/service/indexed-db-service.service';
import { MasterService } from 'src/app/service/master.service';
import { ProfileService } from 'src/app/service/profile.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { ProductState } from "src/app/store/Product_State";
import { LoadTests, TestState } from 'src/app/store/Test_State';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  
  

// Popular Pkg
SlideOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 400,
  nav: false,
  navText: ["", ""],
  center: false,
  startPosition: 0,
  items: 4,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    700: {
      items: 3
    },
    1000: {
      items: 4
    },
    1650: {
      items: 5
    },
    1900: {
      items: 5
    }
  }
};

// TEST
SlideOption = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 400,
  nav: true,
  navText: ["", ""],
  center: false,
  startPosition: 0,
  items: 4,
  responsive: {
    0: {
      items: 3
    },
    500: {
      items: 6
    },
    800: {
      items: 9
    },
    1000: {
      items: 9
    },
    1450: {
      items: 9
    },
    1900: {
      items: 9
    },
  }
};

  SldSecOne: boolean = true;
  data: any;
  testItems: any;
  packageItems: any = [];
  activeModule: any = "Popular Test";
  testWithParamtr: any = [];
  cartTestArr: any = []
  public cartlist: any = []
  isLogin: boolean
  activeGroup: any = "Organ";
  activeGroupName: any = '';
  groupList: any;
  searchText: any
  activeSlideIndex: any = 0
  groupId: number = 0
  organData: any[];
  BasePath:string = environment.BaseLimsApiUrl
  ItemType: any = 'popular_tests'
  isGroupLoaded: boolean = true
  isPopupVisible: boolean = false;
  centerName: any ;
  @Select(TestState.getTests) groupTests$!: Observable<TestResponse[]>
  currentShareUrl: string;
  FirstmapUrl: any;
  SecondmapUrl: any;
  mapUrl: any;
  currentLocationName: any;
  isFieldActive: boolean;
  testname: any;
  currentRoute: string;
  itemId:string

  constructor(
    private _master: MasterService,
    private _auth: AuthService,
    private _router: Router,
    private _cart: CartService,
    private router: Router,
    private store: Store) { }
  
 

  async ngOnInit() {
    AOS.init();
    this.Test('Pathological Test List');

    this.isLogin = this._auth.isLoggedIn();
    this.loadOrganWise();
    
    $(document).ready(function () {
      $('.pPkg').on('click', function () {
        $(this).addClass("active");
        $('.pTest').addClass("inactive");
      });
      $('.pTest').on('click', function () {
        $('.pPkg').removeClass("active");
        $(this).removeClass("inactive");
      });
    })

    let payload1 = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": Number(localStorage.getItem('LOCATION_ID'))
    }
    this._cart.getCartList(payload1).subscribe((res: any) => {
      if (res.status == 1) {
        this.cartlist = res.data
      }
      else if (res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    })

    // try {
    //   await this.IndexedDbService.dbReady$.toPromise(); // Wait for IndexedDB to be ready
    //   let dd = await this.IndexedDbService.getAllItems('Organ_wise'); // Replace 'yourTableName' with actual table name
    // } catch (error) {
    //   console.error('Error fetching slide data:', error);
    // }


    



  }

  
  async loadOrganWise() {
    try {
      if (this.ItemType == 'popular_tests') {
        // if(this._master.loadedGrops != 0) {
        //   this.groupList = this._master.loadedGrops;
        //   this.groupId = this._master.loadedGrops[0].id;
        //   this.isGroupLoaded = false
        //   this.filterTests(this._master.loadedGrops[0].id, this._master.loadedGrops[0].group_name, this._master.loadedGrops[0].tests, 0);
        // } else {
          // this._master.getAllOrganWise(6).subscribe((res:any) => {
          //   this.groupList = res
          //   this._master.loadedGrops = res
          //   this.groupId = res[0].id;
          //   this.isGroupLoaded = false
          //   this.filterTests(res[0].id, res[0].group_name, res[0].tests, 0);
          // });
          this.groupTests$.subscribe({next: (tests) => {
            if(!tests.length) {
              this.store.dispatch(new LoadTests());
            }
           this.groupList = tests
          //  this._master.loadedGrops = tests
          if(tests.length > 0) {
            this.groupId = tests[0].id;
            this.isGroupLoaded = false
            this.filterTests(tests[0].id, tests[0].group_name, tests[0].tests, 0);
          }
          }
        })
        // }
      } else { 
        // if(this._master.loadedGrops != 0) {
        //   this.groupList = this._master.loadedGrops;
        //   this.groupId = this._master.loadedGrops[0].id;
        //   this.isGroupLoaded = false
        //   this.filterPackages(this._master.loadedGrops[0].id, this._master.loadedGrops[0].group_name, this._master.loadedGrops[0].packages, 0);
        // } else {
          // this._master.getAllOrganWise(5).subscribe((res:any) => {
          //   if(res) {
          //     this.groupList = res;
          //     this._master.loadedGrops = res
          //     this.groupId = res[0].id;
          //     this.isGroupLoaded = false
          //     this.filterPackages(res[0].id, res[0].group_name, res[0].packages, 0);
          //   }
          // })
          this.groupTests$.subscribe({next: (pkgs) => {
            if(!pkgs.length) {
              this.store.dispatch(new LoadTests());
            }
              this.groupList = pkgs;
              // this._master.loadedGrops = pkgs
              if(pkgs.length > 0) {
                this.groupId = pkgs[0].id;
                this.isGroupLoaded = false
                this.filterPackages(pkgs[0].id, pkgs[0].group_name, pkgs[0].packages, 0);
              }
          }
        })
        // }
      }
    } catch (error) {
      console.error('Error loading Organ_wise data:', error);
    }
  }  

  // async syncOrganWise() {
  //   await this.IndexedDbService.syncDataFromApi('Organ_wise', 'https://limsapi.nirnayanhealthcare.com/global/getJSON?type=organ');
  // }

  // changeGroupList(group_type: string) {
  //   $("#loader").show();
  //   this.activeGroup = group_type;
  //   const formData = new FormData();
  //   formData.append("group_type", group_type);
  //   this._master.getAllGroups(formData).subscribe((response: any) => {
  //     if (response.message == "Success") {
  //       this.groupList = response.data;
  //       this.groupId = response.data[0].id
  //       this.filterTests(response.data[0].id,response.data[0].name,[],0)
  //       $("#loader").hide();
  //     }
  //   });
  // }




  async filterTests(group_id: any,name:string,tests:any,indx:any) {
    this.activeGroupName = name
    this.activeSlideIndex = indx
    this.testItems = await tests
  // Check if tests has fewer than 6 items
  // if (tests.length <= 6) {
  //   this.testItems = tests.slice(); // Copy all items from tests
  // } else {
  //   this.testItems = tests.slice(0, 6); // Take the first 6 items
  // }
  }

  async filterPackages(group_id: any,name:string,packages:any,indx:any) {
    this.activeGroupName = name
    this.activeSlideIndex = indx
    this.packageItems = await packages
    // if (packages.length <= 6) {
    //   this.packageItems = packages.slice(); // Copy all items from tests
    // } else {
    //   this.packageItems = packages.slice(0, 5); // Take the first 6 items
    // }

  }

  Test(data: any) {
    this.ItemType = 'popular_tests';
    this.activeModule = "Pathological Test List";
    this.loadOrganWise()
    this.data = data;
    this.SldSecOne = true;
  };

  formattedName: string
  detailsPage(testId:string,testName:string) {
    this.formattedName = testName.replace(/[\s.,-]+/g, '-').trim();
    // localStorage.setItem('TEST_ID', testId);
    this.itemId = testId
  }

  formattedNamePkg: string
  detailsPagePkg(pkgid:string,pkgName:string) {
    this.formattedNamePkg = pkgName.replace(/[\s.,()-]+/g, '-').trim();
    this.itemId = pkgid
    // localStorage.setItem('PACKAGE_ID', pkgid);
  }

  parameter: any = [];
  Package(data: any) {
    this.ItemType = 'popular_packages'
    this.loadOrganWise()
    // $("#loader").show();
    this.activeModule = "Popular Packages";
    this.data = data;
    this.SldSecOne = false;
    // if (this._master.packageItem) {
    //   this.packageItems = this._master.packageItem
    //   $("#loader").hide();
    // } else {
    //   const state = 36;
    //   const limit = 6;
    //   const lastId = 0;
    //   const groupId = null
    //   const groupTyp = null
    //   this._master.getAllNewPackages(state, limit, lastId, groupId,groupTyp).subscribe((res: any) => {
    //     if (res.status == 1) {
    //       $("#loader").hide();
    //       this.packageItems = res.data;
    //       this._master.packageItem = res.data
    //     }
    //   }, err => {
    //     console.log(err);
    //     $("#loader").hide();
    //   })
    // }
  };

  //  addToCart(itemId: any, type: any,amount:any) {
  //   let test = {
  //     "schemaName": "nir1691144565",
  //     "user_id": localStorage.getItem('USER_ID'),
  //     "patient_id": 0,
  //     "prod_type": type,
  //     "prod_id": itemId,
  //     "price": amount,
  //     "location_id": localStorage.getItem('LOCATION_ID')
  //   }

  //   this.cartTestArr.push(test)
  //   this._cart.addToCart(test).subscribe((res:any) => {
  //     if(res) {
  //       this._auth.sendQtyNumber(this.cartlist.length + 1);
  //       this.ngOnInit()
  //     }
  //   })

  // }

  prodDetails: any = {}
  addToCart(productId: number, type: string, amount: number) {
    if (!this.isLogin) {
      this.router.navigate(['/pages/login']);
      return
    } else {
      this.prodDetails = {
        'productId': productId,
        'type': type,
        'amount': amount
      }
      this._master.sharePriceInfo(this.prodDetails)
    }
  }
  closeAllModals() {
    $('#patientModal').removeClass('show');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  togglePopup(item: any): void {
    this.isPopupVisible = !this.isPopupVisible;
    this.testname = item.test_name;
    this.itemId = item.id;
    this.formattedName = this.testname.replace(/[\s.,-]+/g, '-').trim();
    this.currentRoute = this.activeModule == 'Popular Packages'? `https://www.nirnayanhealthcare.com/patient/package-details/${this.itemId}/${this.activeGroupName}/${this.formattedName}` :`https://www.nirnayanhealthcare.com/patient/test-details/${this.itemId}/${this.activeGroupName}/${this.formattedName}`;
  }

  copyLink(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    this.isFieldActive = true;
    setTimeout(() => {
      this.isFieldActive = false;
    }, 2000);
  }

  shareUsingWebShare(): void {
    const shareData = {
      title: `Share Of ${this.testname}`,
      text: `Check out this location: ${this.currentRoute}`,
      url: this.currentRoute
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
        console.log('Location shared successfully');
      }).catch((error) => {
        console.error('Error sharing location:', error);
      });
    } else {
      this.copyLinkFallback();
      alert('Web Share API is not supported in your browser. Link copied to clipboard.');
    }
  }

copyLinkFallback(): void {
  const tempInput = document.createElement('input');
  tempInput.value = this.currentRoute;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  this.isFieldActive = true;
  setTimeout(() => {
      this.isFieldActive = false;
  }, 2000);
}





}
