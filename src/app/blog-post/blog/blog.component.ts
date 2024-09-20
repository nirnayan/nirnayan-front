import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser for SSR
import AOS from 'aos'; // Ensure AOS is loaded only in the browser
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Apollo, gql } from 'apollo-angular';
// import { Apollo } from 'apollo-angular';
// import gql from 'graphql-tag';
declare var $: any;


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  
})
export class BlogComponent implements OnInit,AfterViewInit {
  
  basepath:string =environment.BaseLimsApiUrl;
  categoryItems1: any[] = [];
  categoryItems2: any[] = [];
  categoryItems3: any[] = [];
  searchTxt:any

  bannerImages: string[] = [
    '../../../assets/images/v1_358.png',
    '../../../assets/images/v1_402.png',
    '../../../assets/images/v1_328.png',
    '../../../assets/images/v1_446.png'
  ];

  popularPosts = [
    { image: 'v1_328.png',  description: 'The Impact of Technology on the Workplace: How Technology is Changing' },
    { image: 'v1_333.png', description: 'The Impact of Technology on the Workplace: How Technology is Changing.' },
    { image: 'v1_328.png', description: 'The Impact of Technology on the Workplace: How Technology is Changing' },
    { image: 'v1_328.png',  description: 'The Impact of Technology on the Workplace: How Technology is Changing.' }
  ];
  
  featuredPosts: any[] = [
    {
        authorImage: 'v1_389.png',
        author: 'Amit Das',
        date: '4 days ago',
        title: 'Your portfolio is stopping you from getting first',
        excerpt: 'An intense way to learn about the process and practice your design skills - My 1st hackathon Hackathons have been on my mind...',
        image: 'v1_389.png'
    },
    {
        authorImage: 'v1_415.png',
        author: 'Amit Das',
        date: '4 days ago',
        title: 'Your portfolio is stopping you from getting second',
        excerpt: 'An intense way to learn about the process and practice your design skills - My 1st hackathon Hackathons have been on my mind...',
        image: 'v1_415.png'

    },
    {
        authorImage: 'v1_402.png',
        author: 'Amit Das',
        date: '4 days ago',
        title: 'Your portfolio is stopping you from getting third',
        excerpt: 'An intense way to learn about the process and practice your design skills - My 1st hackathon Hackathons have been on my mind...',
        image: 'v1_402.png  '
    }
];

  testList: string[] = ['Heart', 'Lungs', 'Lungs', 'Lungs', 'Lungs'];

  // categories: any[] = [
  //   { name: 'Category 1', number: '1' },
  //   { name: 'Category 1', number: '1' },
  //   { name: 'Category 1', number: '1' },
  //   { name: 'Category 1', number: '1' },
  // ];

  categoryPostCounts: any[] = [];

  blogPost: any = [];
  p: number = 1;
  postItem: any = [];
  searchText: any;
  subscribeFrom: FormGroup;
  submitted: boolean = false;
  categoryName: any;
  tab: any;
  active1: any;
  pageData: any;
  category: any;
  basePath = environment.BaseLimsApiUrl;  

  // SlideOptionn = {
  //   responsive: {
  //     0: {
  //       items: 1,
  //       nav: true,
  //     },
  //     400: {
  //       items: 2,
  //       nav: true,
  //     },
  //     600: {
  //       items: 3,
  //       nav: true,
  //     },
  //     900: {
  //       items: 3
  //     },
  //     1000: {
  //       items: 4
  //     },
  //     1200: {
  //       items: 4
  //     },
  //   }, 
  //   dots: false, 
  //   nav: true
  // };

  // carouselOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: true,
  //   navSpeed: 400,
  //   nav: false,
  //   navText: ["", ""],
  //   center: false,
  //   startPosition: 0,
  //   items: 4,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     768: {
  //       items: 2,
  //     },
  //     992: {
  //       items: 4,
  //     },
  //     1440: {
  //       items: 5
  //     }
  //   },
  // };
  bannerOwlOptions: OwlOptions = {
    loop: true,
    margin: 10, // Adjust margin to control spacing between items
    nav: false,
    dots: true,
    autoplay: true,
    lazyLoad: true,
    center: true,
    autoplaySpeed: 2000,
    autoplayTimeout: 3000,
    slideTransition: 'linear',
    //stagePadding: 350, // Adjust this value to control the amount of adjacent items visible
    responsive: {
      0: {
        items: 1,
        stagePadding:0,
      },
      600: {
        items: 1,
        stagePadding:0,
      },
      1000: {
        items: 1
      }
    }
  };
  

  // items:1,
  // merge:true,
  // loop:true,
  // margin:10,
  // video:true,
  // lazyLoad:true,
  // center:true,
  // responsive:{
  //     480:{
  //         items:2
  //     },
  //     600:{
  //         items:4
  //     }
  // }



  categoryOwlOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    //autoplaySpeed: 4000, // Increased speed for smooth effect
   autoplayTimeout:2000, // Minimal timeout for continuous effect
    //slideTransition: 'linear', // Smooth linear transition
    stagePadding: 10, // Padding on either side for a smoother loop effect
    responsive: {
      0: {
        items: 1
      },
      400:{
        items:1
      },
      600: {
        items: 2
      },
      800: {
        items: 3
      },
    },
   
  };
  blogTitleOne: any;
  blogTitleTwo: any;
  blogTitleThree: any;
  
  constructor(
    private apollo: Apollo,
    private _master: MasterService,
    private _fb: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object, // Inject PLATFORM_ID
    private Uiloader :NgxUiLoaderService
  ) {
    this.subscribeFrom = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required]
    });
  }

  get f() { return this.subscribeFrom.controls; }

  ngOnInit(): void {
    this.Uiloader.start();
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
      this.initializeTabs();
      this.loadBlogCategories();
    }
    // this.loadBlogCategories();
     this.getPageDataById();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadBlogCategories();
    }
  }
 

  
  loadBlogCategories(): void {
    const GET_BLOG_DATA = gql`
      query {
    blogPage{
        category{
            categoryName
            posts{
                id
                postTitle
                postSubTitle
                postShortDescription
                postDescription
                postImage
                postCreateDate
            }
        }
        categoryCount{
            categoryName
            postCount
        }
    }
}
    `;
    this.apollo.query<any>({
      query: GET_BLOG_DATA
    }).subscribe(({ data }) => {
      this.Uiloader.stop();
      if (data.blogPage.category && data.blogPage.category.length > 0) {
        this.categoryItems1 = data.blogPage.category[0].posts || [];
        this.blogTitleOne = data.blogPage.category[0].categoryName
        
        if (data.blogPage.category.length > 1) {
          this.categoryItems3 = data.blogPage.category[1].posts || [];
          this.blogTitleThree = data.blogPage.category[1].categoryName
        }
        if (data.blogPage.category.length > 1) {
          this.categoryItems2 = data.blogPage.category[2].posts || [];
          this.blogTitleTwo = data.blogPage.category[2].categoryName
        }
      }

      if(data.blogPage.categoryCount){
        this.categoryPostCounts = data.blogPage.categoryCount
        .filter((category: {postCount:number})=>category.postCount > 0 )
        .map((category: { categoryName: any; postCount: number; }) => ({
          name: category.categoryName,
          number: category.postCount
        }))
      }

    }, (error) => {
      console.error('Error loading blog categories:', error);
    });
  }

  private initializeTabs(): void {
    $(document).ready(() => {
      $(".blgTbHd").click(function () {
        $(".blgTbHd").removeClass("active show");
        $(this).addClass("active show");
        let tabId = $(this).attr("href");
        $(".blogTab").removeClass("active show");
        $(`.blogTab${tabId}`).addClass("active show");
      });
    });
  }

  getPost(id: any, name: any): void {
    this.categoryName = name;
    this.active1 = id;
    this._master.getAllBlogCategoryFilter(id).subscribe((res: any) => {
      this.postItem = res.status == 1 ? res.data : [];
    });
  }

  saveSubcription(): void {
    this.submitted = true;
    let form = this.subscribeFrom.value;
    const formData = new FormData();
    if (this.subscribeFrom.invalid) {
      Swal.fire('All fields are mandatory !');
      return;
    }
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('mobile', form.mobile);
    $("#loader").show();
    this._master.storeSubscription(formData).subscribe((res: any) => {
      if (res.message === 'Success') {
        $("#loader").hide();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Subscribed Successfully !',
          showConfirmButton: false,
          timer: 1500
        });
        this.subscribeFrom.reset();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    });
  }

  formattedName: any = '';

  blogDetails(id: string, name: any): void {
    this.formattedName = name.replace(/[\s.,-]+/g, '-').trim();
    localStorage.setItem('BLOG_ID', id);
    this._router.navigate(['page/blog-details/' + this.formattedName]);
  }

  getPageDataById(): void {
    const payload = {
      page_id: 14
    };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.pageData = res.data.seoContent;
        this.blogPost = res.data;
        this.changeTitleMetaTag();
      }
    });
  }

  changeTitleMetaTag(): void {
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