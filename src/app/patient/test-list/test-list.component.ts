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
import { IndexedDbService } from 'src/app/service/indexed-db-service.service';
import { SeoService } from 'src/app/service/seo.service';
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
  activeSlideIndex: any = 0;  // New property
  organData: any[];
  pageData: any;
  searchTxt: any
  isPopupVisible: boolean;
  isFieldActive: boolean;
  mapUrl: any;
  SecondmapUrl: any;
  FirstmapUrl: any;
  currentShareUrl: any;
  currentRoute: any;
  testname: any;
  itemId: any;
  constructor(
    private _master: MasterService,
    private auth: AuthService,
    private _cart: CartService,
    private _router: Router,
    private seoService: SeoService
  ) {
    this.loadOrganWise('Organ');
  }

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggedIn();
    $("#loader").show();
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

    this.getPageDataById()


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


  async loadOrganWise(groupType: string) {
    if (groupType == 'Organ') {
      this._master.getAllOrganWise('', 'Organ').subscribe((res: any) => {
        this.groupList = res;
        this.groupId = res[0].id
        this.filterTests(res[0].id, res[0].group_name, '', res[0].tests, 0)
      });
    } else {
      this._master.getAllOrganWise('', 'condition').subscribe((res: any) => {
        this.groupList = res;
        this.groupId = res[0].id
        this.filterTests(res[0].id, res[0].specialityname, '', res[0].tests, 0)
      })
    }
    this.activeGroup = groupType;

  }


  formattedName: string
  detailsPage(testId: string, testName: string) {
    this.formattedName = testName.replace(/[\s.,-]+/g, '-').trim();
    // localStorage.setItem('TEST_ID', testId);
    this.itemId = testId
  }

  refresh() {
    this.activeGroup = 'Organ'
    this.ngOnInit()
  }

  getAllGroups() {
    $("#loader").show();
    this._master.getLimsALlGroup(0).subscribe((res: any) => {
      if (res.status == 1) {
        this.groupList = res.data;
        this.activeGroupId = res.data[0].id
        this.filterTests(res.data[0].id, res.data[0].group_name, 'Organ', [], 0)
        $("#loader").hide();
      }
    });
  }

  // ACTIVE CLASS Start
  filterTests(group_id: any, group_name: any, activeGroup: any, tests: [], index: any) {
    $('#nodata').text('')
    this.activeGroupName = group_name;
    this.activeGroupId = group_id;
    this.activeSlideIndex = index;  // New line
    this.testItems = tests
  }
  // ACTIVE CLASS End

  // testDetails(id: any, img: any) {
  //   this._route.navigate(['patient/test-details/', id]);
  // }

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
    const groupId = this.activeGroupId;
    const groupTyp = this.activeGroup
    this._master.getAllNewTests(state, limit, lastId, groupId, groupTyp).subscribe((res: any) => {
      if (res.status == 1) {
        $('#nodata').text('')
        this.isLoading = false;
        this.lastItemId = this.testItems[this.testItems.length - 1].id;
        this.testItems = localArr.concat(res.data);
      } else {
        this.isLoading = false;
        $('#nodata').text('No more data found.')
        console.log('No more data found.');
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

  getPageDataById() {
    const payload = {
      page_id: 12
    }
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag()
      }
    })
  }

  togglePopup(item: any): void {
    this.isPopupVisible = !this.isPopupVisible;
    this.testname = item.test_name;
    this.itemId = item.id
    this.formattedName = this.testname.replace(/[\s.,-]+/g, '-').trim();
    this.currentRoute = `https://www.nirnayanhealthcare.com/patient/test-details/${this.itemId}/${this.activeGroupName}/${this.formattedName}`;
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

  changeTitleMetaTag() {
    if (this.pageData) {
      this.seoService.updateTitle(this.pageData.title);
      const metaTags = this.pageData.name.map(nameObj => ({
        name: nameObj.title,
        content: nameObj.description
      }));
      this.seoService.updateMetaTags(metaTags);

      const propertyTags = this.pageData.propertyType.map(propertyObj => ({
        property: propertyObj.title,
        content: propertyObj.description
      }));
      this.seoService.updatePropertyTags(propertyTags);
    }
  }
}