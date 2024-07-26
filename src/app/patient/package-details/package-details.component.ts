import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/service/auth.service';
import { IndexedDbService } from 'src/app/service/indexed-db-service.service';
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';
import { environment } from 'src/environments/environment';
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
  constructor(private _master: MasterService,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _router: Router,
    private seoService:SeoService,
    private IndexService: IndexedDbService
  ) { }
  ngOnInit(): void {
    AOS.init();
    $(document).ready(function () {
      $(document).on("click", ".parameterBoxHead", function () {
        $(this).closest(".parameterBox").toggleClass("open");
        $(this).closest(".parameterBox").siblings(".parameterBox").removeClass("open")
      });
    });
    // this._route.params.subscribe((param: any) => {
      //   const id = localStorage.getItem('PACKAGE_ID')
      //   const state =36
      // this._master.getTestById(id,state).subscribe((res: any) => {
      //   if (res.status == 1) {
      //     this.details = res.data;
      //   }
      // }, err => {
      //   console.log(err)
      //   $("#loader").hide();
      // })

      $("#loader").show();
      setTimeout(async () => {
        const testId = localStorage.getItem('PACKAGE_ID');
        const tableName = 'allPackageList'; // Replace with your table name
        const id = Number(testId);
        this.details = await this.IndexService.getPackageById(tableName, id);
        $("#loader").hide();
      }, 1000);

    // })
    this.isLogin = this._auth.isLoggedIn()
    this.getAllBlogs();
    this.getAllFeedback();
    this.getPageDataById();
  }

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
  
  getAllBlogs() {
    if (this._master.blogPostItem) {
      this.blogs = this._master.blogPostItem
    } else {
      this._master.getBlogs().subscribe((res: any) => {
        if (res.message == 'Success') {
          let allItems = [];
          for (let item of res.data) {
            if (item.status == 1) {
              allItems.push(item)
            }
          }
          this.blogs = allItems;
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
  closeAllModals() {
    $('#patientModal').removeClass('show');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
  getPageDataById() {
    const payload = {
      page_id: 26
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
