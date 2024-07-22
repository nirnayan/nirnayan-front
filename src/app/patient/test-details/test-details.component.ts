import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
  details:any;
  parameters:any;
  cartTestArr: any = []
  cartlist:any = []
  isLogin: boolean = false
  slideNum:any;
  blogs: any = [];
  basePath= environment.BaseLimsApiUrl

  products: any[]= [1,2,3,4,5,6,7,8,9,10];
  activeModule: any;
  
    customOptions: any = {
      loop: true,
      margin: 10,
      nav: false,
      dots: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        1000: {
          items: 1
        }
      }
    };
  pageData: any;

  constructor(private _master: MasterService,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _cart: CartService,
    private _router: Router,
    private elementRef: ElementRef,
    private seoService:SeoService
  ) { }

  ngOnInit(): void {
    // Accordian Code Start
    document.addEventListener("DOMContentLoaded", function() {
      var firstAccordionItem = document.querySelector("#collapseOne");
      if (firstAccordionItem) {
          firstAccordionItem.classList.add("show");
          firstAccordionItem.previousElementSibling.querySelector("button").setAttribute("aria-expanded", "true");
      }
      });
// Accordian Code Start

    this.isLogin = this._auth.isLoggedIn()
    let payload1 = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": Number(localStorage.getItem('LOCATION_ID'))
    }
    this._cart.getCartList(payload1).subscribe((res:any) => {
      if(res.status == 1) {
        this.cartlist = res.data
      }
      else if(res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    })
    $(document).ready(function() {
      $('.accordion-collapse').collapse('hide');
      $('#flush-collapseOne').collapse('show');
  
      $('.accordion-button').click(function() {
          $('.accordion-collapse').collapse('hide');
          $(this).closest('.accordion-item').find('.accordion-collapse').collapse('show');
      });
  });
    // this._toastr.success('everything is broken', 'Major Error');
    this.getProductDetails();
    this.setupButtonClickListeners();
    this.getAllBlogs();
    this.getAllFeedback();
    this.getPageDataById();
  }
  prodDetails:any = {}
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

  formattedName: string
  detailsPage(testId:string,testName:string) {
    this.formattedName = testName.replace(/[\s.,-]+/g, '-').trim();
    localStorage.setItem('TEST_ID', testId);
    // this._router.navigate(['/patient/test-details/'+formattedName])
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
  getProductDetails(){
      const formData = localStorage.getItem('TEST_ID');
      const state =  36;
      this._master.getTestById(formData,state).subscribe(
        (res:any) => {
        $("#loader").hide();
        if(res.status == 1) {
          this.details = res.data;
        }
      }, err => {
        console.log(err)
        $("#loader").hide();
      })

  }


  refresh() {
    this.ngOnInit()
  }

  getAllBlogs() {
    if(this._master.blogPostItem) {
      this.blogs = this._master.blogPostItem
    } else {
      this._master.getBlogs().subscribe((res:any) => {
        if(res.message == 'Success') {
          let allItems = [];
          for(let item of res.data){
            if(item.status == 1) {
              allItems.push(item)
            }
          }
          this.blogs = allItems.slice(0,9);
          this._master.blogPostItem = allItems
        }
      })
    }
  }
  allFeedback:any=[]
  getAllFeedback(){
    this._master.getAllFeedback().subscribe((res:any)=>{
      if(res.status===1)
        this.allFeedback=res.data;
      }
    )
  }
  generateStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('fa fa-star u-star');
      } else {
        stars.push('fa fa-star-o u-star');
      }
    }
    return stars;
  }

  getPageDataById() {
    const payload = {
      page_id: 25
    }
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if(res.status == 1){
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag()
      }
    })
  }


  changeTitleMetaTag() {
    console.log(this.pageData);
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
