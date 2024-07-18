import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import AOS from 'aos';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { MasterService } from 'src/app/service/master.service';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  SlideOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
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
        items: 2
      },
      1000: {
        items: 4
      },
      1650: {
        items: 4
      }
    }
  };

  SlideOption = {
    responsive: {
      0: {
        items: 3
      },
      500: {
        items: 5
      },
      800: {
        items: 9
      },
      1000: {
        items: 9
      },
      1450: {
        items: 12
      },
    }, dots: false, nav: true,
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
  groupId: string

  constructor(private _master: MasterService,
    private _auth: AuthService,
    private _router: Router,
    private _cart: CartService,
    private router: Router,
    private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    $("#loader").hide();
    AOS.init();
    this.Test('Pathological Test List');
    // $("#loader").show();
    // if (this._master.testMasterItem) {
    //   this.testItems = this._master.testMasterItem
    // } else {
    //   this._master.getTestMaster().subscribe((res: any) => {
    //     if (res.message == 'Success') {
    //       this.testItems = Object.entries(res.data.tests);
    //       this._master.testMasterItem = Object.entries(res.data.tests);
    //     }
    //   }, err => {
    //     console.log(err);
    //     $("#loader").hide();
    //   })
    // }
    // this.homePageTest(36)
    this.changeGroupList("Organ");

    const state = 36;
    const limit = 6;
    const lastId = 0;
    const groupTyp = this.activeGroup
    const groupId = this.groupId
    this._master.getAllNewTests(state, limit, lastId,groupId,groupTyp).subscribe((res: any) => {
      if (res.status == 1) {
        this.testItems = res.data
      }
    })


    this.isLogin = this._auth.isLoggedIn()
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

  }




  // redirectItems(item: any) {
  //   this.router.navigate(['/patient/test-details', item.id]);
  // }

  // homePageTest(state: number) {
  //   this._cart.getHomePageTest(state).subscribe(
  //     (response: any) => {
  //       // Handle successful response
  //     },
  //     (error: any) => {
  //       // Handle error
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }

  changeGroupList(group_type: string) {
    $("#loader").show();
    this.activeGroup = group_type;
    const formData = new FormData();
    formData.append("group_type", group_type);
    this._master.getAllGroups(formData).subscribe((response: any) => {
      if (response.message == "Success") {
        this.groupList = response.data;
        this.groupId = response.data[0].id
        this.filterTests(response.data[0].id,response.data[0].name,0)
        $("#loader").hide();
      }
    });
  }

  filterTests(group_id: any,name:string,indx:any) {
    this.activeGroupName = name
    this.activeSlideIndex = indx
    const state = 36;
    const limit = 6;
    const lastId = 0;
    const groupId = group_id;
    const groupTyp = this.activeGroup
    this._master.getAllNewTests(state, limit, lastId, groupId,groupTyp).subscribe((res: any) => {
      if (res.status == 1) {
        // this.isLoading = false;
        this.testItems = res.data;
      }
    });
  }

  Test(data: any) {
    this.activeModule = "Pathological Test List";
    this.data = data;
    this.SldSecOne = true;
  };

  formattedName: string
  detailsPage(testId:string,testName:string) {
    this.formattedName = testName.replace(/[\s.,-]+/g, '-').trim();
    localStorage.setItem('TEST_ID', testId);
  }

  formattedNamePkg: string
  detailsPagePkg(pkgid:string,pkgName:string) {
    this.formattedNamePkg = pkgName.replace(/[\s.,()-]+/g, '-').trim();
    localStorage.setItem('PACKAGE_ID', pkgid);
  }

  parameter: any = [];
  Package(data: any) {
    $("#loader").show();
    this.activeModule = "Popular Packages";
    this.data = data;
    this.SldSecOne = false;
    if (this._master.packageItem) {
      this.packageItems = this._master.packageItem
      $("#loader").hide();
    } else {
      const state = 36;
      const limit = 6;
      const lastId = 0;
      const groupId = null
      const groupTyp = null
      this._master.getAllNewPackages(state, limit, lastId, groupId,groupTyp).subscribe((res: any) => {
        if (res.status == 1) {
          $("#loader").hide();
          this.packageItems = res.data;
          this._master.packageItem = res.data
        }
      }, err => {
        console.log(err);
        $("#loader").hide();
      })
    }
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
}
