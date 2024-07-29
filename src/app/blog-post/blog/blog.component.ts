import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
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
  basePath = environment.BaseLimsApiUrl

  SlideOptionn = {
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      400: {
        items: 2,
        nav: true,
      },
      600: {
        items: 3,
        nav: true,
      },
      900: {
        items: 3
      },
      1000: {
        items: 4
      },
      1200: {
        items: 4
      },

    }, dots: false, nav: true
  };

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
        items: 1, // 2 items for mobile devices
      },
      768: {
        items: 2, // 3 items for tablets
      },
      992: {
        items: 4, // 5 items for larger screens
      },
      1440: {
        items: 5 // 4 items for desktop screen
      }
    },
  };

  constructor(
    private _master: MasterService,
    private _fb: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {
    this.subscribeFrom = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile: ['', Validators.required]
    })
  }

  get f() { return this.subscribeFrom.controls; }


  ngOnInit(): void {
    AOS.init();
    this._master.getAllBlogCategory().subscribe((res: any) => {
      if (res.status == 1) {
        this.category = res.data;
        $("#loader").hide();
        this.getPost(res.data[0].id , res.data[0].name)
        }
    })
    // Tab Click Script
    const blogTabs = document.getElementById("majorTabs") as HTMLDivElement;
    window.onload = () => {
      $(".blgTbHd").click(function () {
        $(".blgTbHd").removeClass("active show");
        $(this).addClass("active show");
        let tabId = $(this).attr("href");
        $(".blogTab").removeClass("active show");
        $(`.blogTab${tabId}`).addClass("active show");
      });
    };


    //Seo Base
    this.getPageDataById()
  };

  getPost(id: any , name) {
    this.categoryName = name
    let item = id
    this.active1 = id
    this._master.getAllBlogCategoryFilter(item).subscribe((res: any) => {
      if (res.status == 1) {
        this.postItem = res.data;
      }else{
        this.postItem = []
      }
      console.log(this.postItem)
    });
    // }

    // $(".owl-item li").click(function(){
    //   $(this).parent().siblings().children("li").removeClass('active');
    //   });
  };

  saveSubcription() {
    this.submitted = true;
    let form = this.subscribeFrom.value;
    const formData = new FormData();
    if (this.subscribeFrom.invalid) {
      Swal.fire('All fields are mandatory !');
      return;
    }
    formData.append('name', form['name']);
    formData.append('email', form['email']);
    formData.append('mobile', form['mobile']);
    $("#loader").show();
    this._master.storeSubscription(formData).subscribe((res: any) => {
      if (res.message == 'Success') {
        $("#loader").hide();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Subscribed Successfully !',
          showConfirmButton: false,
          timer: 1500
        })

        this.subscribeFrom.reset();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
  };

  formattedName: any = ''
  blogDetails(id: string, name: any) {
    console.log(id , name)
    this.formattedName = name.replace(/[\s.,-]+/g, '-').trim();
    localStorage.setItem('BLOG_ID', id);
    this._router.navigate(['page/blog-details/' + this.formattedName])
  }


  getPageDataById() {
    const payload = {
      page_id: 14
    }
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if(res.status == 1){
        this.pageData = res.data.seoContent;
        this.blogPost = res.data
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
