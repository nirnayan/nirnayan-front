import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { IndexedDbService } from 'src/app/service/indexed-db-service.service';
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';
import { environment } from 'src/environments/environment.prod';
declare var $: any;


@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {
  centerName: any;


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

  groupList: any = [];
  packageList: any;
  activeGroup: any = "Organ";
  activeGroupName: any;
  searchText: any;
  p: number = 1;
  lastId: any;
  loading: boolean = false;
  packageItems: any = [];
  lastItemId: any = 0
  cartTestArr: any[];
  public cartlist: any = []
  isLogin: boolean;
  groupId: any;
  testItems: any;
  BasePath: string = environment.BaseLimsApiUrl
  pageData: any;
  searchTxt:any
  currentShareUrl: string;
  isFieldActive: boolean;
  currentLocationName: any;
  SecondmapUrl: any;
  mapUrl: any;
  FirstmapUrl: any;
  isPopupVisible: any;
  testname: any;
  currentRoute: string;
  itemId: any;
  constructor(private _master: MasterService,
    private _router: Router,
    private _cart: CartService,
    private _auth: AuthService,
    private IndexedDbService: IndexedDbService,
    private seoService:SeoService,

  ) { 
    this.loadTypeWise('Organ');
  }

  ngOnInit(): void {
    AOS.init();
    this.isLogin = this._auth.isLoggedIn()
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= 400) {
        $(".tlMiddleBr").addClass("fxd");
        $(".tstLst").addClass("fxdd");
        $(".tlMiddle").addClass("scrll");
        $(".tstTopSec").addClass("fixx");
      } else {
        $(".tlMiddleBr").removeClass("fxd");
        $(".tstLst").removeClass("fxdd");
        $(".tlMiddle").removeClass("scrll");
        $(".tstTopSec").removeClass("fixx");
      }
    });
    this.getPageDataById();
  }


  async loadTypeWise(groupType:string) {
    if(groupType == 'Organ') {
      this._master.getAllOrganWise('', 'Organ').subscribe((res: any) => {
        this.groupList = res;
        this.groupId = res[0].id
        this.filterTests(res[0].id,res[0].group_name,res[0].packages,0)
      });
    } else {
      this._master.getAllOrganWise('', 'condition').subscribe((res: any) => {
        this.groupList = res;
        this.groupId = res[0].id
        this.filterTests(res[0].id,res[0].group_name,res[0].packages,0)
      });
    }
    this.activeGroup = groupType;

  }

  formattedName: string
  detailsPage(pkgid:string,pkgName:string) {
    this.formattedName = pkgName.replace(/[\s.,()-]+/g, '-').trim();
    this.itemId = pkgid
  }


  // Get All Groups
  getAllGroupss() {
    $("#loader").show();
    const formData = new FormData();
    formData.append("group_type", "Organ");
    this._master.getAllGroups(formData).subscribe((res: any) => {
      if (res.message == "Success") {
        this.groupList = res.data;
        this.activeGroupName = res.data[0].name
        // this.filterTests(res.data[0].id, res.data[0].name, 0)
        if (this._master.packageListItem) {
          this.packageList = this._master.packageListItem
          $("#loader").hide();
        } else {
          // this._master.getpackages('').subscribe((response: any) => {
          //   if (response.message == "Success") {
          //     $("#loader").hide();
          //     this.packageList = response.data['packages'];
          //     this._master.packageListItem = response.data['packages'];
          //     let lastElement = this.packageList[this.packageList.length - 1];
          //     this.lastId = lastElement.id;

          //   }
          // });
        }
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    });
  };

  activeSlideIndex: any = 0
  async filterTests(group_id: any, group_name: any, packages:any, index: any) {
    this.packageItems = await packages;
    this.activeGroupName = group_name;
    this.activeSlideIndex = index
  }


  isLoading: boolean = false;
  loadMore() {
    this.isLoading = true;
    let localArr = this.packageItems
    const state = 36;
    const limit = 18;
    const lastId = this.lastItemId;
    const groupId = this.groupId
    const groupTyp = this.activeGroup
    this._master.getAllNewPackages(state, limit, lastId, groupId,groupTyp).subscribe((res: any) => {
      if (res.status == 1) {
        // this.testItems = res.data
        this.isLoading = false;
        this.lastItemId = this.packageItems[this.packageItems.length - 1].id
        this.packageItems = localArr.concat(res.data)
        // this.lastItemId = this.testItems[this.testItems.length - 1].id
      } else if (res.status == 0) {
        this.isLoading = false;
        $('#nodata').text('No more data found.')
      }
    })
  }

  prodDetails: any = {}
  addToCart(productId: number, type: string, amount: number) {
    if (!this.isLogin) {
      this._router.navigate(['/pages/login']);
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
  searchFilter(data: any) {
    const test: any = 'package';
    const key = data;
    const state = 36;
    const groupId = this.groupId
    this._master.getSearchItem(test, key, state, groupId).subscribe((res: any) => {
      if (res.status == 1) {
        this.packageItems = res.data;
      }
    })
  }
  closeAllModals() {
    $('#patientModal').removeClass('show');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  getPageDataById() {
    const payload = {
      page_id: 13
    }
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if(res.status == 1){
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag()
      }
    })
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



  togglePopup(item: any): void {
    this.isPopupVisible = !this.isPopupVisible;
    this.testname = item.test_name;
    this.itemId = item.id
    this.formattedName = this.testname.replace(/[\s.,-]+/g, '-').trim();
    this.currentRoute = `https://www.nirnayanhealthcare.com/patient/package-details/${this.itemId}/${this.activeGroupName}/${this.formattedName}`;
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
