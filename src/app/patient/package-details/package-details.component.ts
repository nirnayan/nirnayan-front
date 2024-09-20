import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../service/auth.service';
import { IndexedDbService } from '../../service/indexed-db-service.service';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import { environment } from '../../../environments/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {
  basePath = environment.BaseLimsApiUrl
  details: any;
  parameters: any;
  pckgeImage: any;
  isLogin: boolean = false
  prodDetails: any
  blogs: any[];
  itemId: string;
  activeGroupName: string
  pkgid: any
  // Slider 
  customOptions4: any = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      800: {
        items: 2
      },
      1200: {
        items: 2
      },
      1950: {
        items: 2
      }
    }
  };
  // Slider 

  products: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  activeModule: any;
  carouselOptions: OwlOptions = {
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
        items: 1, // 1 items for mobile devices
      },
      535: {
        items: 1, // 2 items for tablets
      },
      768: {
        items: 3, // 3 items for tablets
      },
      900: {
        items: 4, // 4 items for larger screens
      },
    },
  };
  pageData: any;
  constructor(
    private _master: MasterService,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _router: Router,
    private seoService: SeoService,
    private IndexService: IndexedDbService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private uiLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.uiLoader.start()
      AOS.init();
      this._route.paramMap.subscribe(params => {
        this.itemId = params.get('id');
        this.activeGroupName = params.get('groupname')
      });

      // $("#loader").show();
      // setTimeout(async () => {
      //   const testId = this.itemId;
      //   const tableName = 'allPackageList';
      //   const id = Number(testId);
      //   this.details = await this.IndexService.getPackageById(tableName, id);
      //   // $("#loader").hide();
      //   this.uiLoader.stop()
      // }, 1000);
      this.uiLoader.start()
      const state = 36
      this._master.getTestById(this.itemId, state).subscribe((res: any) => {
        if (res.status == 1) {
          this.uiLoader.stop()
          this.details = res.data;
          this.pageData = res.data.test.seoContent.metaContent;
          this.changeTitleMetaTag();
        }
      }, err => {
        console.log(err)
        this.uiLoader.stop()
      })
      this.isLogin = this._auth.isLoggedIn();
      this.getAllBlogs();
      this.getAllFeedback();
      this.documentJquery()
    }
  }


  documentJquery() {
    if (isPlatformBrowser(this.platformId)) {
      $(document).ready(() => {
        $(document).on("click", ".parameterBoxHead", function () {
          $(this).closest(".parameterBox").toggleClass("open");
          $(this).closest(".parameterBox").siblings(".parameterBox").removeClass("open");
        });
      });
    }
  }

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

  getAllBlogs() {
    this.uiLoader.start()
    if (this._master.blogPostItem) {
      this.blogs = this._master.blogPostItem;
    } else {
      this._master.getBlogs().subscribe((res: any) => {
        if (res.message === 'Success') {
          this.uiLoader.stop()
          const allItems = res.data.filter(item => item.status === 1);
          this.blogs = allItems;
          this._master.blogPostItem = allItems;
        }
      });
    }
  }

  allFeedback: any[] = [];
  getAllFeedback() {
    this._master.getAllFeedback().subscribe((res: any) => {
      if (res.status === 1) {
        this.allFeedback = res.data;
      }
    });
  }
  formattedNamePkg?: string;
  detailsPagePkg(pkgid: string, pkgName: string) {
    console.log(pkgid, pkgName)
    this.formattedNamePkg = pkgName
      .replace(/[\s.,()/]+/g, '-')
      .replace(/\//g, '-')
      .trim();

    this.pkgid = pkgid;
  }

  generateStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < rating ? 'fa fa-star u-star' : 'fa fa-star-o u-star');
  }

  closeAllModals() {
    if (isPlatformBrowser(this.platformId)) {
      $('#patientModal').removeClass('show');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }
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
