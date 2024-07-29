import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from 'src/app/service/master.service';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { AuthService } from 'src/app/service/auth.service';
import { SeoService } from 'src/app/service/seo.service';
import { IndexedDbService } from 'src/app/service/indexed-db-service.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  department: any = [];
  departItem: any = [];
  departItems: any = [];
  activeIndex: number = 0;
  contectUsForm: FormGroup;
  gallery: any = [];
  active1: any;
  description: any = '';
  titile: any = '';
  allMembers: any
  slideNum: any;
  blogs: any = [];
  qualitys: any = [1];
  activeGroupName: any;
  isLogin: boolean = false
  basePath: any = environment.BaseLimsApiUrl
  SlideOptionn = {
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 2.7
      },

    }, dots: true, nav: false
  };

  SlideOptions = {
    responsive: {
      0: {
        items: 2.5
      },
      600: {
        items: 2.5
      },
    }, dots: true, nav: false, center: true, loop: false,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: false,
    pullDrag: false,
    center: false,
    dots: true,
    nav: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  };

  SlideOptioon = {
    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 2
      },
      400: {
        items: 3
      },
      600: {
        items: 3
      },
      1000: {
        items: 3
      },

    }, dots: true, nav: false
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
        items: 2, // 2 items for mobile devices
      },
      768: {
        items: 3, // 3 items for tablets
      },
      900: {
        items: 4, // 5 items for larger screens
      },
    },
  };
  quality: OwlOptions = {
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
      300: {
        items: 1,
      },
      768: {
        items: 1, // 3 items for tablets
      },
      900: {
        items: 1, // 5 items for larger screens
      },
    },
  };
  form = {
    contact_name: '',
    contact_email: '',
    contact_mobile: '',
    address: '',
    contact_enquiry: '',
    enquiry_type: null
  };
  hovering: any;
  testItems: any[] = [1, 2, 3];
  displayItemCount: number = 12;
  isLoading: boolean = false
  pageData: any;
  constructor(private _master: MasterService,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private seoService: SeoService,
    private IndexedDbService: IndexedDbService,
  ) { }

  ngOnInit(): void {
    $("#loader").hide();
    AOS.init();
    var str = $(this);
    this.getAllBlogs();
    $(document).ready(function () {
      $('.team-member figure:hover figcaption').parent('.text-doctor').css('display', 'none');
      $(".stpRow .mat-expansion-panel .mat-expansion-panel-header").click(function () {
        $(this).parent().parent('.stpRow').toggleClass('sptxt');
        $(this).parent().parent().siblings().removeClass('sptxt');
      });

      $(".accreBoxRow").click(function () {
        $(this).toggleClass('accreAct');
        $(this).siblings().removeClass('accreAct');
      });
    });

    this.getPage();
    window.onload = () => {
      $(".blgTbHd").click(function () {
        $(".blgTbHd").removeClass("active show");
        $(this).addClass("active show");
        let tabId = $(this).attr("href");
        $(".blogTab").removeClass("active show");
        $(`.blogTab${tabId}`).addClass("active show");
      });
    };
    this.isLogin = this._auth.isLoggedIn()

    console.log('IndexDb department', this.IndexedDbService.departmentData);
    if (this.IndexedDbService.departmentData.length) {
      this.departItem = this.IndexedDbService.departmentData;
      this.departmentDetail( this.departItem[0]?.id, this.departItem[0]?.description, this.departItem[0]?.dept_name, 0, this.departItem[0]?.tests );
    } else {
      this.syncDepartmentWise().then(() => {
        this.getPageItem();
      });
    }

  }

  // limitTodepartments(){
  //   return this.departItems.slice(0, this.displayItemCount);
  //   // if (Array.isArray(this.departItems)) {
  //   // } else {
  //   //   console.error('departItems is not an array:', this.departItems);
  //   //   return [];
  //   // }
  // }
  

  getPage() {
    this._master.getPageContent().subscribe((res: any) => {
      let depart = [];

      if (res.message == 'Success') {
        for (let item of res.data) {
          if (item.id == 15) {
            depart.push(item)
          }
        }
        this.department = depart;
      }
    })
    // this.getPageItem();
    this.getPageDataById()
  };


  async getPageItem() {
    let departmentData = await this.IndexedDbService.getAllItems('allDepartment');
    this.departItem = departmentData;
    console.log(this.departItem);
    this.IndexedDbService.departmentData = this.departItem;
    this.departmentDetail( this.departItem[0]?.id, this.departItem[0]?.description, this.departItem[0]?.dept_name, 0, this.departItem[0]?.tests );
  }

  departmentDetail(id: any, desc: any, name: any, i: any, item: any) {
    this.activeIndex = i
    // let item = id
    this.active1 = item;
    this.titile = name;
    this.description = desc;
    let formData = new FormData();
    this.departItems = Array.isArray(item) ? item : [];
    console.log(item)
    $("#loader").hide();
    formData.append('department_id', id);
    console.log(id)

    this._master.getDoctors(formData).subscribe((res: any) => {
      $("#loader").hide();
      if (res.message == 'Success') {
        this.departItems = res.data;
        let mebers = []
        for (let index = 0; index < res.data.members.length; index++) {
          const element = res.data.members[index];
          if (element.status == 1) {
            mebers.push(element)
          }
        }
        this.allMembers = mebers
      }
    }, err => {
      console.log(err);
      // $("#loader").hide();
    })
    formData.append('department', id);
    this._master.getGallery(formData).subscribe((res: any) => {
      if (res.message == 'Success') {
        this.gallery = res.data;
      }
    })
  };
  showMoreItems() {
    this.isLoading = true
    setTimeout(() => {
      this.displayItemCount += 12;
      this.isLoading = false
    }, 2000);
  }
  saveForm() {
    const formData = new FormData();
    formData.append('contact_name', this.form['contact_name']);
    formData.append('contact_email', this.form['contact_email']);
    formData.append('contact_mobile', this.form['contact_mobile']);
    formData.append('address', this.form['address']);
    formData.append('contact_enquiry', this.form['contact_enquiry']);
    formData.append('enquiry_type', 'association');

    $("#loader").show();
    this._master.storeContactUs(formData).subscribe((res: any) => {
      $("#loader").hide();
      if (res.message == 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Sent Successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        this.form = {
          contact_name: '',
          contact_email: '',
          contact_mobile: '',
          address: '',
          contact_enquiry: '',
          enquiry_type: 'department',
        };
        $("#loader").hide();
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
        $("#loader").hide();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    })
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
  getPageDataById() {
    const payload = {
      page_id: 5
    }
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag()
      }
    })
  }

  async syncDepartmentWise() {
    $("#loader").show();
    await this.IndexedDbService.syncDataFromApi('allDepartment', 'https://limsapi.nirnayanhealthcare.com/global/getJSON?type=department');
     $("#loader").show();
  }

  formattedName: string
  detailsPage(testId: string, testName: string) {
    this.formattedName = testName.replace(/[\s.,-]+/g, '-').trim();
    localStorage.setItem('TEST_ID', testId);
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
