import { Component, ElementRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../service/auth.service';
import { CartService } from '../../service/cart.service';
import { IndexedDbService } from '../../service/indexed-db-service.service';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import { environment } from '../../../environments/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
  details: any;
  parameters: any;
  cartTestArr: any = [];
  cartlist: any = [];
  isLogin: boolean = false;
  slideNum: any;
  blogs: any = [];
  basePath = environment.BaseLimsApiUrl;
  itemId: string;
  products: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  activeModule: any;
  pageData: any;
  activeGroupName:any;
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 }
    }
  };

  constructor(
    private _master: MasterService,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _cart: CartService,
    private _router: Router,
    private elementRef: ElementRef,
    private seoService: SeoService,
    private IndexService: IndexedDbService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private uiLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._route.paramMap.subscribe(params => {
        this.itemId = params.get('id');
        this.activeGroupName = params.get("groupname")
      });

      this.isLogin = this._auth.isLoggedIn();
      const payload1 = {
        "schemaName": "nir1691144565",
        "user_id": Number(localStorage.getItem('USER_ID')),
        "location_id": Number(localStorage.getItem('LOCATION_ID'))
      };

      this._cart.getCartList(payload1).subscribe((res: any) => {
        if (res.status === 1) {
          this.cartlist = res.data;
        } else if (res.status === 503 || res.status === 403) {
          localStorage.clear();
          this._router.navigate(['/auth/login']);
        }
      });

      // this.setupAccordion();
      this.getProductDetails();
      this.setupButtonClickListeners();
      this.getAllBlogs();
      this.getAllFeedback();
    }
  }

  // setupAccordion() {
  //   $(document).ready(() => {
  //     $('.accordion-collapse').collapse('hide');
  //     $('#flush-collapseOne').collapse('show');

  //     $('.accordion-button').click(function () {
  //       $('.accordion-collapse').collapse('hide');
  //       $(this).closest('.accordion-item').find('.accordion-collapse').collapse('show');
  //     });
  //   });
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

  formattedName: string;

  detailsPage(testId: string, testName: string) {
    this.formattedName = testName.replace(/[\s.,-]+/g, '-').trim();
    this.itemId = testId;
  }

  setupButtonClickListeners() {
    const buttons = this.elementRef.nativeElement.querySelectorAll('.cartbutton');
    buttons.forEach(button => {
      // button.addEventListener('click', (e: Event) => {
      //   if (!button.classList.contains('loading')) {
      //     button.classList.add('loading');
      //     setTimeout(() => button.classList.remove('loading'), 3700);
      //   }
      //   e.preventDefault();
      // });
    });
  }

  // async getProductDetails(): Promise<void> {
  //   this.uiLoader.start(); // Show loader
  //   try {
  //     const testId = this.itemId;
  //     const tableName = 'allTestsList'; // Replace with your table name
  //     const id = Number(testId);
  //     this.details = await this.IndexService.getTestById(tableName, id);
  //   } catch (error) {
  //     console.error('Error fetching product details:', error);
  //   } finally {
  //     this.uiLoader.stop(); // Hide loader
  //   }
  // }

  getProductDetails() {
    // const formData = new FormData();
    // formData.append('test_id', this.itemId);
    const state =  36;
    this._master.getTestById(this.itemId, state).subscribe(
      (res: any) => {
        $("#loader").hide();
        if (res.status == 1) {
          this.details = res.data;
          this.pageData = res.data.test.seoContent.metaContent;
          this.changeTitleMetaTag();
        }
      }, err => {
        console.log(err)
        $("#loader").hide();
      })

  }

  refresh() {
    this.ngOnInit();
  }

  getAllBlogs() {
    if (this._master.blogPostItem) {
      this.blogs = this._master.blogPostItem;
    } else {
      this._master.getBlogs().subscribe((res: any) => {
        if (res.message === 'Success') {
          const allItems = res.data.filter(item => item.status === 1);
          this.blogs = allItems.slice(0, 9);
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

  generateStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'fa fa-star u-star' : 'fa fa-star-o u-star');
    }
    return stars;
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
