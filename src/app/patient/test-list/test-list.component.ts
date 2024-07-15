import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { MasterService } from 'src/app/service/master.service';
import { environment } from 'src/environments/environment';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css', './slide.component.css']
})
export class TestListComponent implements OnInit {
  @ViewChildren('carouselSlide') carouselSlides!: QueryList<ElementRef>;
  SlideOptionn = {
    responsive: {
      0: {
        items: 1
      },
      950: {
        items: 2
      },
    }, dots: true, nav: false
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
        items: 9
      },
    }, dots: false, nav: true,
  };

  basePath: any = environment.BaseLimsApiUrl;
  groupList: any;
  testList: any;
  activeGroup: any = "Organ";
  activeGroupName: any;
  searchText: any;
  p: number = 1;
  isLogin: boolean = false;
  cartTestArr: any = [];
  cartlist: any = [];
  testItems: any;
  lastItemId: any = 0;
  ConditionWise: any;
  products: any;
  groupId: any;
  activeGroupId: number | null = null;
  activeSlideIndex: number = 0;  // New property

  constructor(
    private _master: MasterService, 
    private spiner: NgxSpinnerService,
    private _route: Router,
    private auth: AuthService, 
    private _cart: CartService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggedIn();
    $("#loader").show();
    this.getAllGroups();
    AOS.init();
    
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      if (scroll >= 400) {
        $(".tlMiddleBr").addClass("fxd");
        $(".tstLst").addClass("fxdd");
        $(".tlMiddle").addClass("scrll");
        $(".tstTopSec").addClass("fixx");
        $(".testListSec").addClass("mtpp");
      } else {
        $(".tlMiddleBr").removeClass("fxd");
        $(".tstLst").removeClass("fxdd");
        $(".tlMiddle").removeClass("scrll");
        $(".tstTopSec").removeClass("fixx");
        $(".testListSec").removeClass("mtpp");
      }
    });

    const state = 36;
    const limit = 18;
    const lastId = 0;
    const groupId = null;
    this._master.getAllNewTests(state, limit, lastId, groupId).subscribe((res: any) => {
      if (res.status == 1) {
        this.testItems = res.data;
        this.lastItemId = this.testItems[this.testItems.length - 1].id;
      }
    });

    let payload1 = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": Number(localStorage.getItem('LOCATION_ID'))
    };
    this._cart.getCartList(payload1).subscribe((res: any) => {
      if (res.status == 1) {
        this.cartlist = res.data;
      } else if (res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login']);
      }
    });
  }

  Condition(group_type) {
    this.activeGroup = group_type;
    $("#loader").show();
    this._master.getConditionWise(0).subscribe((res: any) => {
      if (res.status == 1) {
        this.groupList = res.data;
        $("#loader").hide();
      }
    });
  }

  organ(group_type) {
    this.activeGroup = group_type;
    $("#loader").show();
    this._master.getLimsALlGroup(0).subscribe((res: any) => {
      if (res.status == 1) {
        this.groupList = res.data;
        $("#loader").hide();
      }
    });
  }

  changeGroupList(group_type) {
    $("#loader").show();
    this.activeGroup = group_type;
    this.activeGroupName = null;
    const formData = new FormData();
    formData.append("group_type", group_type);
    this._master.getAllGroups(formData).subscribe((response: any) => {
      if (response.message == "Success") {
        this.groupList = response.data;
        $("#loader").hide();
      }
    });
  }

  // ACTIVE CLASS Start
  filterTests(group_id: any, group_name: any, activeGroup: any, index: number) {
    this.activeGroupName = group_name;
    this.activeGroupId = group_id;
    this.activeSlideIndex = index;  // New line
    if (activeGroup == 'Organ') {
      this.groupId = group_id;
      const state = 36;
      const limit = 18;
      const lastId = 0;
      const groupId = group_id;
      this._master.getAllNewTests(state, limit, lastId, groupId).subscribe((res: any) => {
        if (res.status == 1) {
          this.isLoading = false;
          this.testItems = res.data;
        }
      });
    } else if (activeGroup == 'Condition') {
      this.groupId = group_id;
      const state = 36;
      const limit = 18;
      const lastId = 0;
      const groupId = group_id;
      this._master.getAllNewTests(state, limit, lastId, groupId).subscribe((res: any) => {
        if (res.status == 1) {
          this.isLoading = false;
          this.testItems = res.data;
        }
      });
    }
  }
// ACTIVE CLASS End

  getAllGroups() {
    $("#loader").show();
    this._master.getLimsALlGroup(0).subscribe((res: any) => {
      if (res.status == 1) {
        this.groupList = res.data;
        $("#loader").hide();
      }
    });
  }

  testDetails(id: any, img: any) {
    this._route.navigate(['patient/test-details/', id]);
  }

  prodDetails: any = {};
  addToCart(productId: number, type: string, amount: number) {
    if (!this.isLogin) {
      this._router.navigate(['/pages/login']);
      return;
    } else {
      this.prodDetails = {
        'productId': productId,
        'type': type,
        'amount': amount
      };
      this._master.sharePriceInfo(this.prodDetails);
    }
  }

  redirectItems(_t58: any) {
    throw new Error("Method not implemented.");
  }

  isLoading: boolean = false;
  loadMoreTest() {
    this.isLoading = true;
    let localArr = this.testItems;
    const state = 36;
    const limit = 18;
    const lastId = this.lastItemId;
    const groupId = null;
    this._master.getAllNewTests(state, limit, lastId, groupId).subscribe((res: any) => {
      if (res.status == 1) {
        this.isLoading = false;
        this.lastItemId = this.testItems[this.testItems.length - 1].id;
        this.testItems = localArr.concat(res.data);
      }
    });
  }

  searchFilter(data: any) {
    const test: any = 'test';
    const key = data;
    const state = 36;
    const groupId = this.groupId;
    this._master.getSearchItem(test, key, state, groupId).subscribe((res: any) => {
      if (res.status == 1) {
        this.testItems = res.data;
      }
    });
  }

  closeAllModals() {
    $('#patientModal').removeClass('show');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  // New method for handling carousel changes
  onCarouselChange(event: any) {
    this.activeSlideIndex = event.startPosition;
  }
}