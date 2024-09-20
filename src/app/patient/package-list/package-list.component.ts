import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { AuthService } from '../../service/auth.service';
import { CartService } from '../../service/cart.service';
import { IndexedDbService } from '../../service/indexed-db-service.service';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import $ from 'jquery'
@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {
  centerName: any;

  SlideOptionn = {
    margin: 50,
    autoWidth: true,
    responsive: {
      0: { items: 1 },
      950: { items: 2 }
    },
    dots: true,
    nav: false
  };

  slideConfig = {
    slidesToShow: 9,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };
  slides: any[] = [
    { image: 'assets/images/Banner-01.jpg' },
    { image: 'assets/images/Banner-02.jpg' }
  ];

  groupList: any[] = [];
  packageList: any;
  activeGroup: string = 'Organ';
  activeGroupName: string;
  searchText: string;
  p: number = 1;
  lastId: number | null = null;
  loading: boolean = false;
  packageItems: any[] = [];
  lastItemId: number = 0;
  cartTestArr: any[] = [];
  public cartlist: any[] = [];
  isLogin: boolean = false;
  groupId: number | null = null;
  testItems: any;
  BasePath: string = environment.BaseLimsApiUrl;
  pageData: any;
  searchTxt: string;
  currentShareUrl: string;
  isFieldActive: boolean = false;
  currentLocationName: string;
  SecondmapUrl: string;
  mapUrl: string;
  FirstmapUrl: string;
  isPopupVisible: boolean = false;
  testname: string;
  currentRoute: string;
  itemId: number | null = null;
  activeSlideIndex: number;
  isLoading: boolean = false;

  constructor(
    private _master: MasterService,
    private _router: Router,
    private _cart: CartService,
    private _auth: AuthService,
    private IndexedDbService: IndexedDbService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private uiLoader: NgxUiLoaderService
  ) {
    this.loadTypeWise('Organ');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
      $(window).scroll(() => {
        const scroll = $(window).scrollTop();
        // $(".tlMiddleBr").toggleClass("fxd", scroll >= 400);
        // $(".tstLst").toggleClass("fxdd", scroll >= 400);
        // $(".tlMiddle").toggleClass("scrll", scroll >= 400);
        // $(".tstTopSec").toggleClass("fixx", scroll >= 400);
      });
    }
    this.getPageDataById();
  }
  async loadTypeWise(groupType: string) {
    this.uiLoader.start(); // Show loader

    try {
      if (groupType === 'Organ') {
        this._master.getAllOrganWise('', 'Organ').subscribe((res: any) => {
          this.groupList = res;
          this.groupId = res[0].id;
          this.filterTests(res[0].id, res[0].group_name, res[0].packages, 0);
        });
      } else {
        this._master.getAllOrganWise('', 'condition').subscribe((res: any) => {
          this.groupList = res;
          this.groupId = res[0].id;
          this.filterTests(res[0].id, res[0].group_name, res[0].packages, 0);
        });
      }
      this.activeGroup = groupType;
    } finally {
      this.uiLoader.stop(); // Hide loader
    }
  }

  formattedName: string;

  detailsPage(pkgid: string, pkgName: string) {
    this.formattedName = pkgName.replace(/[\s.,()-]+/g, '-').trim();
    this.itemId = parseInt(pkgid, 10);
  }

  async filterTests(group_id: number | null, group_name: string, packages: any, index: number) {
    this.packageItems = await packages;
    this.activeGroupName = group_name;
    this.activeSlideIndex = index;
  }

  loadMore() {
    this.isLoading = true;
    let localArr = [...this.packageItems];
    const state = 36;
    const limit = 18;
    const lastId = this.lastItemId;
    const groupId = this.groupId;
    const groupTyp = this.activeGroup;

    this._master.getAllNewPackages(state, limit, lastId, groupId, groupTyp).subscribe((res: any) => {
      this.isLoading = false;
      if (res.status === 1) {
        this.lastItemId = this.packageItems[this.packageItems.length - 1]?.id ?? 0;
        this.packageItems = localArr.concat(res.data);
      } else if (res.status === 0) {
        $('#nodata').text('No more data found.');
      }
    });
  }

  prodDetails: any = {};

  addToCart(productId: number, type: string, amount: number) {
    if (!this.isLogin) {
      this._router.navigate(['/pages/login']);
      return;
    }
    this.prodDetails = {
      productId: productId,
      type: type,
      amount: amount
    };
    this._master.sharePriceInfo(this.prodDetails);
  }

  searchFilter(data: any) {
    const test: any = 'package';
    const key = data;
    const state = 36;
    const groupId = this.groupId;
    this._master.getSearchItem(test, key, state, groupId).subscribe((res: any) => {
      if (res.status === 1) {
        this.packageItems = res.data;
      }
    });
  }

  closeAllModals() {
    if (isPlatformBrowser(this.platformId)) {
      $('#patientModal').removeClass('show');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }
  }

  getPageDataById() {
    const payload = {
      page_id: 13
    };

    this.uiLoader.start(); // Show loader

    this._master.getDataPageById(payload).subscribe((res: any) => {
      this.uiLoader.stop(); // Hide loader
      if (res.status === 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag();
      }
    });
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
    if (isPlatformBrowser(this.platformId)) {
      this.isPopupVisible = !this.isPopupVisible;
      this.testname = item.test_name;
      this.itemId = item.id;
      this.formattedName = this.testname.replace(/[\s.,-]+/g, '-').trim();
      this.currentRoute = `https://www.nirnayanhealthcare.com/patient/package-details/${this.itemId}/${this.activeGroupName}/${this.formattedName}`;
    }
  }

  copyLink(inputElement: HTMLInputElement): void {
    if (isPlatformBrowser(this.platformId)) {
      inputElement.select();
      document.execCommand('copy');
      this.isFieldActive = true;
      setTimeout(() => {
        this.isFieldActive = false;
      }, 2000);
    }
  }

  shareUsingWebShare(): void {
    if (isPlatformBrowser(this.platformId)) {
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
  }

  copyLinkFallback(): void {
    if (isPlatformBrowser(this.platformId)) {
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
}
