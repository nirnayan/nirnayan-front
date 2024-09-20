import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import AOS from 'aos';
import { TestResponse } from '../../Interface/BannerInt';
import { AuthService } from '../../service/auth.service';
import { CartService } from '../../service/cart.service';
import { MasterService } from '../../service/master.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { ProductState } from "../../store/Product_State";
import { LoadTests, TestState } from '../../store/Test_State';
import { isPlatformBrowser } from '@angular/common';
import $ from 'jquery'; // Import jQuery

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],

})
export class SlideComponent implements OnInit , OnDestroy {
  // Slide options for various components
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
      0: { items: 1 },
      600: { items: 2 },
      700: { items: 3 },
      1000: { items: 4 },
      1650: { items: 5 },
      1900: { items: 5 }
    }
  };

  SlideOption = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
     autoplay: true,
    autoplaySpeed: 2000, // Increased speed for smooth effect
    autoplayTimeout: 3000, // Minimal timeout for continuous effect
    slideTransition: 'linear', // Smooth linear transition
    nav: false,
    // navText: ["", ""],
    center: false,
    startPosition: 0,
    items: 4,
    responsive: {
      0: { items: 3 },
      500: { items: 6 },
      800: { items: 9 },
      1000: { items: 9 },
      1450: { items: 9 },
      1900: { items: 9 }
    }
  };

  SldSecOne = true;
  data: any;
  testItems: any;
  packageItems: any = [];
  activeModule = "Popular Test";
  testWithParamtr: any = [];
  cartTestArr: any = [];
  cartlist: any = [];
  isLogin = false;
  activeGroup = "Organ";
  activeGroupName = '';
  groupList: any;
  searchText: any;
  activeSlideIndex = 0;
  groupId = 0;
  organData: any[] = [];
  BasePath = environment.BaseLimsApiUrl;
  ItemType = 'popular_tests';
  isGroupLoaded = true;
  isPopupVisible = false;
  centerName: any;
  @Select(TestState.getTests) groupTests$!: Observable<TestResponse[]>;
  currentShareUrl?: string;
  FirstmapUrl: any;
  SecondmapUrl: any;
  mapUrl: any;
  currentLocationName: any;
  isFieldActive = false;
  testname?: string;
  currentRoute?: string;
  itemId?: string;

  constructor(
    private _master: MasterService,
    private _auth: AuthService,
    private _router: Router,
    private _cart: CartService,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLogin = this._auth.isLoggedIn();
      this.loadOrganWise();
    }
    if (isPlatformBrowser(this.platformId)) {
      $('[aria-label="Close"]').on('click', () => this.closeAllModals());
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
      this.Package('Pathological Test List');

      $(document).ready(() => {
        $('.pPkg').on('click', function() {
          $(this).addClass("active");
          $('.pTest').addClass("inactive");
        });
        $('.pTest').on('click', function() {
          $('.pPkg').removeClass("active");
          $(this).removeClass("inactive");
        });
      });

      const payload1 = {
        schemaName: "nir1691144565",
        user_id: Number(localStorage.getItem('USER_ID')),
        location_id: Number(localStorage.getItem('LOCATION_ID'))
      };

      this._cart.getCartList(payload1).subscribe((res: any) => {
        if (res.status === 1) {
          this.cartlist = res.data;
        } else if (res.status === 503 || res.status === 403) {
          localStorage.clear();
          this._router.navigate(['/auth/login']);
        }
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      // Remove the event listener when the component is destroyed
      $('[aria-label="Close"]').off('click');
    }
  }
  // async loadOrganWise() {
  //   try {
  //     if (this.ItemType === 'popular_tests') {
  //       this.groupTests$.subscribe({
  //         next: (tests) => {
  //           if (tests.length === 0) {
  //             this.store.dispatch(new LoadTests());
  //           }
  //           this.groupList = tests;
  //           if (tests.length > 0) {
  //             this.groupId = tests[0].id;
  //             this.isGroupLoaded = false;
  //             this.filterTests(tests[0].id, tests[0].group_name, tests[0].tests, 0);
  //           }
  //         }
  //       });
  //     } else {
  //       this.groupTests$.subscribe({
  //         next: (pkgs) => {
  //           if (pkgs.length === 0) {
  //             this.store.dispatch(new LoadTests());
  //           }
  //           this.groupList = pkgs;
  //           if (pkgs.length > 0) {
  //             this.groupId = pkgs[0].id;
  //             this.isGroupLoaded = false;
  //             this.filterPackages(pkgs[0].id, pkgs[0].group_name, pkgs[0].packages, 0);
  //           }
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error loading Organ_wise data:', error);
  //   }
  // }

  async loadOrganWise() {
    try {
      if (this.ItemType == 'popular_tests') {
        if(this._master.loadedGrops != 0) {
          this.groupList = this._master.loadedGrops;
          this.groupId = this._master.loadedGrops[0].id;
          this.isGroupLoaded = false
          this.filterTests(this._master.loadedGrops[0].id, this._master.loadedGrops[0].group_name, this._master.loadedGrops[0].tests, 0);
        } else {
        this._master.getAllOrganWise(6,'home_page').subscribe((res:any) => {
          this.groupList = res.groupWise
          this._master.loadedGrops = res.groupWise
          this.groupId = this.groupList[0].id;
          this.isGroupLoaded = false
          this.filterTests(this.groupList[0].id, this.groupList[0].group_name, this.groupList[0].tests, 0);
        });

        }
      } else {
        if(this._master.loadedGrops != 0) {
          this.groupList = this._master.loadedGrops;
          this.groupId = this._master.loadedGrops[0].id;
          this.isGroupLoaded = false
          this.filterPackages(this._master.loadedGrops[0].id, this._master.loadedGrops[0].group_name, this._master.loadedGrops[0].packages, 0);
        } else {
        this._master.getAllOrganWise(5,'home_page').subscribe((res:any) => {
          if(res) {
            this.groupList = res.conditionWise;
            this._master.loadedGrops = res.conditionWise
            this.groupId = this.groupList[0].id;
            this.isGroupLoaded = false
            this.filterPackages(this.groupList[0].id, this.groupList[0].group_name, this.groupList[0].packages, 0);
          }
        })
        }
      }
    } catch (error) {
      console.error('Error loading Organ_wise data:', error);
    }
  }

  async filterTests(group_id: any, name: string, tests: any, indx: any) {
    this.activeGroupName = name
    this.activeSlideIndex = indx
    this.testItems = await tests.slice(0, 6)
  }

  async filterPackages(group_id: any, name: string, packages: any, indx: any) {
    this.activeGroupName = name
    this.activeSlideIndex = indx
    this.packageItems = await packages.slice(0, 5)
  }

  // Test(data: any) {
  //   this.ItemType = 'popular_tests';
  //   this.activeModule = "Pathological Test List";
  //   this.loadOrganWise();
  //   this.data = data;
  //   this.SldSecOne = true;
  // }

  formattedName?: string;
  detailsPage(testId: string, testName: string) {
    this.formattedName = testName.replace(/[\s.,-]+/g, '-').trim();
    this.itemId = testId;
  }

  formattedNamePkg?: string;
  detailsPagePkg(pkgid: string, pkgName: string) {
    this.formattedNamePkg = pkgName.replace(/[\s.,()-]+/g, '-').trim();
    this.itemId = pkgid;
  }

  // parameter: any = [];
  // Package(data: any) {
  //   this.ItemType = 'popular_packages';
  //   this.loadOrganWise();
  //   this.activeModule = "Popular Packages";
  //   this.data = data;
  //   this.SldSecOne = false;
  // }

  parameter: any = [];
  async Package(data: any) {
    if(data == 'Popular Packages') {
      this.data = await data;
      this.ItemType = 'popular_packages'
      this.loadOrganWise()
      this.activeSlideIndex = -1
      this.activeModule = "Popular Packages";
      this.SldSecOne = false;
    } else {
      this.data = await data;
      this.ItemType = 'popular_tests';
      this.activeModule = "Pathological Test List";
      this.loadOrganWise()
      this.activeSlideIndex = -1
      this.SldSecOne = true;
    }

  };

  prodDetails: any = {};
  addToCart(productId: number, type: string, amount: number) {
    if (!this.isLogin) {
      this._router.navigate(['/pages/login']);
      return;
    } else {
      this.prodDetails = {
        productId,
        type,
        amount
      };
      this._master.sharePriceInfo(this.prodDetails);
    }
  }

  closeAllModals() {
    // if (isPlatformBrowser(this.platformId)) {
    //   const $modal = $('#exampleModal');
    //   $('#patientModal')
    //     .removeClass('show')
    //     .css('display', 'none')
    //     .css('padding-right', '')
    //     .attr('aria-hidden', 'true');
    //   $('body')
    //     .removeClass('modal-open')
    //     .css('padding-right', '')
    //     .css('position', 'relative')
    //     .css('min-height', '100%')
    //     .css('top', '0px')
    //   $('.modal-backdrop').remove();
    //   setTimeout(() => {
    //     $modal.off('click.dismiss.bs.modal');
    //   }, 300);
    // }  
  }

  togglePopup(item: any): void {
    this.isPopupVisible = !this.isPopupVisible;
    this.testname = item.test_name;
    this.itemId = item.id;
    this.formattedName = this.testname?.replace(/[\s.,-]+/g, '-').trim();
    this.currentRoute = this.activeModule === 'Popular Packages'
      ? `https://www.nirnayanhealthcare.com/patient/package-details/${this.itemId}/${this.activeGroupName}/${this.formattedName}`
      : `https://www.nirnayanhealthcare.com/patient/test-details/${this.itemId}/${this.activeGroupName}/${this.formattedName}`;
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
    if (isPlatformBrowser(this.platformId)) {
      const tempInput = document.createElement('input');
      tempInput.value = this.currentRoute || '';
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
