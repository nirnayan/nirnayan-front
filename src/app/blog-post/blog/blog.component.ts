import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from 'src/app/service/master.service';
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
    private _router: Router) {
    this.subscribeFrom = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile: ['', Validators.required]
    })
  }

  get f() { return this.subscribeFrom.controls; }


  ngOnInit(): void {
    AOS.init();
    this._master.getPageContent().subscribe((res: any) => {
      if (res.message == 'Success') {
        let blog = res.data;
        for (let item of blog) {
          if (item.id == 1) {
            this.blogPost.push(item);
            let categoryId = item.category[0].item_id;
            this.categoryName = item.category[0].item_text;
            $("#loader").hide();
            this.getPost(categoryId, this.categoryName);
          }
        }
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
  };

  getPost(id: any, cateName: any) {
    let item = id
    this.active1 = item;
    this.categoryName = cateName;
    const formData = new FormData();
    formData.append('category_id', id);
    // if(this._master.blogListItem) {
    //   this.postItem = this._master.blogListItem
    // } else {
    this._master.getAllBlogs(formData).subscribe((res: any) => {
      if (res.message == 'Success') {
        let activeBlog = [];
        for (let item of res.data) {
          if (item.status == 1) {
            activeBlog.push(item);
          }
        }
        this.postItem = activeBlog;
        this._master.blogListItem = activeBlog
      }
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

  formattedName:any = ''
  blogDetails(id:string,name:any) {
    this.formattedName = name.replace(/[\s.,-]+/g, '-').trim();
    localStorage.setItem('BLOG_ID', id);
    this._router.navigate(['page/blog-details/'+this.formattedName])
  }
}
