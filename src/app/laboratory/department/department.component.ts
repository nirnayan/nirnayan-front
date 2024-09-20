import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from '../../service/master.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';
import { SeoService } from '../../service/seo.service';
import { IndexedDbService } from '../../service/indexed-db-service.service';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
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
  allMembers: any;
  slideNum: any;
  blogs: any = [];
  qualitys: any = [1];
  activeGroupName: any;
  isLogin: boolean = false;
  basePath: any = environment.BaseLimsApiUrl;
  SlideOptionn = {
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 2.7 },
    },
    dots: true,
    nav: false
  };

  SlideOptions = {
    responsive: {
      0: { items: 2.5 },
      600: { items: 2.5 },
    },
    dots: true,
    nav: false,
    center: true,
    loop: false,
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
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 }
    },
  };

  SlideOptioon = {
    responsive: {
      0: { items: 1 },
      200: { items: 2 },
      400: { items: 3 },
      600: { items: 3 },
      1000: { items: 3 },
    },
    dots: true,
    nav: false
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
      0: { items: 2 },
      768: { items: 3 },
      900: { items: 4 },
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
      0: { items: 1 },
      300: { items: 1 },
      768: { items: 1 },
      900: { items: 1 },
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
  isLoading: boolean = false;
  pageData: any;
  itemId:any
  constructor(
    private _master: MasterService,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private seoService: SeoService,
    private IndexedDbService: IndexedDbService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private uiLoader: NgxUiLoaderService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.uiLoader.start();
      AOS.init();
      this.getAllBlogs();
      this.setupJQueryInteractions();
      this.getPage();
      this.isLogin = this._auth.isLoggedIn();
      this.initializeDepartmentData();
    }
  }

  setupJQueryInteractions(): void {
    if (isPlatformBrowser(this.platformId)) {
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

      window.onload = () => {
        $(".blgTbHd").click(function () {
          $(".blgTbHd").removeClass("active show");
          $(this).addClass("active show");
          let tabId = $(this).attr("href");
          $(".blogTab").removeClass("active show");
          $(`.blogTab${tabId}`).addClass("active show");
        });
      };
    }
  }

  async initializeDepartmentData(): Promise<void> {
    if (this.IndexedDbService.departmentData.length) {
      this.departItem = this.IndexedDbService.departmentData;
      this.uiLoader.stop();
      this.departmentDetail(
        this.departItem[2]?.id,
        this.departItem[2]?.description,
        this.departItem[2]?.dept_name,
        2,
        this.departItem[2]?.tests
      );
    } else {
      await this.syncDepartmentWise();
      this.getPageItem();
    }
  }

  getPage() {
    this.uiLoader.start();
    this._master.getPageContent().subscribe((res: any) => {
      if (res.message == 'Success') {
        this.department = res.data.filter(item => item.id == 15);
        this.uiLoader.stop();
      }
    });
    this.getPageDataById();
  }

  async getPageItem(): Promise<void> {
    this.uiLoader.stop();
    let departmentData = await this.IndexedDbService.getAllItems('allDepartment');
    this.departItem = departmentData;
    this.IndexedDbService.departmentData = this.departItem;
    this.departmentDetail(
      this.departItem[2]?.id,
      this.departItem[2]?.description,
      this.departItem[2]?.dept_name,
      2,
      this.departItem[2]?.tests
    );
  }

  departmentDetail(id: any, desc: any, name: any, i: any, item: any) {
    this.activeIndex = i;
    this.active1 = item;
    this.titile = name;
    this.description = desc;
    this.departItems = item;
    let formData = new FormData();
    formData.append('department_id', id);

    if (id) {
      this._master.getDoctors(formData).subscribe((res: any) => {
        if (res.message == 'Success') {
          this.allMembers = res.data.members.filter(member => member.status == 1);
        }
      });
    }

    formData.append('department', id);
    this._master.getGallery(formData).subscribe((res: any) => {
      if (res.message == 'Success') {
        this.gallery = res.data;
      }
    });
  }

  showMoreItems() {
    this.isLoading = true;
    setTimeout(() => {
      this.displayItemCount += 12;
      this.isLoading = false;
    }, 2000);
  }

  saveForm() {
    const formData = new FormData();
    formData.append('contact_name', this.form.contact_name);
    formData.append('contact_email', this.form.contact_email);
    formData.append('contact_mobile', this.form.contact_mobile);
    formData.append('address', this.form.address);
    formData.append('contact_enquiry', this.form.contact_enquiry);
    formData.append('enquiry_type', 'association');

    this.uiLoader.start();

    this._master.storeContactUs(formData).subscribe((res: any) => {
      this.uiLoader.stop();
      if (res.message == 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Sent Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        this.form = {
          contact_name: '',
          contact_email: '',
          contact_mobile: '',
          address: '',
          contact_enquiry: '',
          enquiry_type: 'department',
        };
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    }, err => {
      console.log(err);
      this.uiLoader.stop();
    });
  }

  getAllBlogs() {
    if (this._master.blogPostItem) {
      this.blogs = this._master.blogPostItem;
    } else {
      this._master.getBlogs().subscribe((res: any) => {
        if (res.status == 1) {
          this.blogs = res.data.filter(item => item.status == 1);
          this._master.blogPostItem = this.blogs;
        }
      });
    }
  }

  getPageDataById() {
    const payload = { page_id: 5 };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag();
      }
    });
  }

  async syncDepartmentWise(): Promise<void> {
    this.uiLoader.start();
    await this.IndexedDbService.syncDataFromApi('allDepartment', 'https://limsapi.nirnayanhealthcare.com/global/getJSON?type=department&state=36&limit=12');
    this.uiLoader.stop();
  }

  formattedName: string;

  detailsPage(testId: string, testName: string, groupName: any) {
    // Ensure testId is defined
    if (!testId) {
      console.error('Test ID is undefined');
      return;
    }
  
    // Process testName, defaulting to a safe value if undefined
    const formattedName = testName 
      ? testName.replace(/[\s.,-]+/g, '-').trim() 
      : 'unknown-test';
  
    // Process groupName, defaulting to 'others' if undefined
    const activeGroupName = groupName && groupName[0]?.item_text 
      ? groupName[0].item_text 
      : 'others';
  
    console.log(testId, activeGroupName, formattedName);
    console.log(testName, testId, groupName);
  
    // Construct the URL
    const url = this._router.serializeUrl(
      this._router.createUrlTree(['/patient/test-details', testId, activeGroupName, formattedName])
    );
  
    // Open the URL in a new window
    const windowFeatures = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
    window.open(url, '_blank', windowFeatures);
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
