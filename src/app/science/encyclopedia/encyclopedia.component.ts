import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import AOS from 'aos';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $: any;

@Component({
  selector: 'app-encyclopedia',
  templateUrl: './encyclopedia.component.html',
  styleUrls: ['./encyclopedia.component.css']
})
export class EncyclopediaComponent implements OnInit, AfterViewInit {
  pageItem: any;
  groupItem: any = [];
  p: number = 1;
  activeIndex: number = 0;
  carusaltype: boolean = true;
  showPrevButton = false;
  showNextButton = true;
  BasePath = environment.LimsEndpointBase
  @ViewChild('navTabs', { read: ElementRef }) navTabs: ElementRef;
  currentIndex = 0;
  basePath = environment.LimsEndpointBase

  // Condition Wise
  customOptions: any = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      800: {
        items: 5
      },
      1200: {
        items: 5
      },
      1950: {
        items: 5
      }
    }
  };

  customOptions2: any = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      800: {
        items: 4
      },
      1200: {
        items: 4
      },
      1950: {
        items: 4
      }
    }
  };

  customOptions3: any = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      500: {
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

  customOptions4: any = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      500: {
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

  customOptions5: any = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      410: {
        items: 1
      },
      933: {
        items: 2
      },
      800: {
        items: 1
      },
      1100: {
        items: 1
      },
      1240: {
        items: 2
      },
      1950: {
        items: 1
      }
    }
  };

  isLogin: boolean = false;

  form = {
    contact_name: '',
    contact_email: '',
    contact_mobile: '',
    address: '',
    contact_enquiry: '',
    enquiry_type: null
  };

  groupName: any = ''
  groupDetails: any = ''
  activeModule:any
  otherInfo: any = ''
  groupname: any = ''
  pageData: any;
  isBrowser:any
  activeType:string =  'organ'
  constructor(
    private _master: MasterService,
    private renderer: Renderer2,
    private seoService: SeoService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private uiLoader:NgxUiLoaderService,
    private route:ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.uiLoader.start();
    if (this.isBrowser) {
      AOS.init();
      this.route.queryParams.subscribe(params => {
        this.activeIndex = +params['activeIndex'];
        this.activeModule = params['activeModule'] || '';
  
        
        if (this.activeModule.toLowerCase() === 'organ wise') {
          this.getOrganGroupsParam();
          this.activeType = 'organ'
        } else if (this.activeModule.toLowerCase() === 'condition wise') {
           this.activeType = 'condition'
          this.getConditionWiseParam();
        }
      });
      
      this._master.getPageContent().subscribe((res: any) => {
        if (res.message === 'Success') {
          this.uiLoader.stop();
          let pages = res.data.filter(item => item.id === 17);
          this.pageItem = pages;
          this.cdr.detectChanges();
        }
      });
      if(!this.activeIndex && this.activeModule == ''){
        this.getGroup()
      }
      this.DocumentJquery();
      this.getPageDataById();
    }
  }
  

  getOrganGroupsParam(): void {
    this.uiLoader.start();
    this._master.getLimsALlGroup(1).subscribe((res: any) => {
      if (res.status == 1) {
        this.uiLoader.stop();
        this.groupItem = res.data.filter((item: any) => item.status == 1);
        this.otherInfo = res.data.find((item: any) => item.id == this.activeIndex) || res.data[0];
        this.groupname = this.otherInfo.group_name;
        this.changeGroupData(this.otherInfo.id);
        this.setActiveIndexParam(this.otherInfo.id, 'organ', this.otherInfo);
        this.cdr.detectChanges();
      }
    });
  }
  
  getConditionWiseParam(): void {
    this.uiLoader.start();
    this._master.getConditionWise(1).subscribe((res: any) => {
      if (res.status == 1) {
        this.uiLoader.stop();
        this.groupItem = res.data.filter((item: any) => item.status == 1);
        this.otherInfo = res.data.find((item: any) => item.id == this.activeIndex) || res.data[0];
        this.groupname = this.otherInfo.specialityname;
        this.changeGroupData(this.otherInfo.id);
        this.setActiveIndexParam(this.otherInfo.id, 'condition', this.otherInfo);
        this.cdr.detectChanges();
      }
    });
  }
  
  setActiveIndexParam(index: number, type: string, item: any) {
    this.activeIndex = index;
    this.changeGroupData(item.id);
  
    if (type === 'organ') {
      this.otherInfo = item;
      this.groupName = item.group_name;
      this.groupname = item.group_name;
      this.groupDetails = item.description;
    } else if (type === 'condition') {
      this.otherInfo = item;
      this.groupName = item.specialityname;
      this.groupname = item.specialityname;
      this.groupDetails = item.description;
    }
    this.cdr.detectChanges();
  }

  DocumentJquery(){
    if (isPlatformBrowser(this.platformId)) {
      // jQuery code for DOM manipulation
      $(document).ready(() => {
        $(".stpRow .mat-expansion-panel-header").click(function () {
          $(this).parent().parent('.stpRow').toggleClass('sgtp');
          $(this).parent().parent().siblings().removeClass('sgtp');
        });
      });

      // Tab Click Script
      const blogTabs = document.getElementById("majorTabs") as HTMLDivElement;
      window.onload = () => {
        $(".blgTbHd").click(function () {
          $(".blgTbHd").removeClass("active show");
          $(this).addClass("active show");
          let tabId = $(this).attr("href");
          $(".blogTabs").removeClass("active show");
          $(`.blogTabs${tabId}`).addClass("active show");
        });
      };
    }
  }

  formattedTestName: string;
  test_id:any
  testDetailsPage(testId: string, testName: string) {
    this.test_id = testId;
    this.formattedTestName = testName.replace(/[\s.,/-]+/g, '-').trim();
    // localStorage.setItem('TEST_ID', testId);
  }

  formattedPkgName: string;
  pkg_id:string
  detailsPkgPage(pkgid: string, pkgName: string) {
    this.formattedPkgName = pkgName.replace(/[\s.,()-]+/g, '-').trim();
    // localStorage.setItem('PACKAGE_ID', pkgid);
    this.pkg_id = pkgid
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.updateButtonsVisibility();
    }
  }

  getGroup() {
    if (this.isBrowser) {
      $("#loader").show();
      this._master.getLimsALlGroup(1).subscribe((res: any) => {
        $("#loader").hide();
        if (res.status == 1) {
          this.groupItem = res.data.filter((item: any) => item.status == 1);
          this.otherInfo = res.data[0];
          this.groupname = res.data[0].group_name;
          this.changeGroupData(res.data[0].id);
          this.cdr.detectChanges();
        }
      });
    }
  }

  groupInfo: any;
  changeGroupData(group_id: any) {
    let payload = { "group_id": group_id, "limit": 10 };
    this._master.getGroupWiseDetails(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.groupInfo = res.data;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmitQuery(f) {
    const formData = new FormData();
    formData.append('contact_name', this.form['contact_name']);
    formData.append('contact_email', this.form['contact_email']);
    formData.append('contact_mobile', this.form['contact_mobile']);
    formData.append('address', this.form['address']);
    formData.append('contact_enquiry', this.form['contact_enquiry']);
    formData.append('enquiry_type', 'association');

    if (this.isBrowser) {
      $("#loader").show();
      this._master.storeContactUs(formData).subscribe((res: any) => {
        $("#loader").hide();
        if (res.message === 'Success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Sent Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          f.resetForm()
          this.form = {
            contact_name: '',
            contact_email: '',
            contact_mobile: '',
            address: '',
            contact_enquiry: '',
            enquiry_type: null
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
        $("#loader").hide();
      });
    }
  }

  setActiveIndex(index: number, type: any, item: any) {
    this.activeIndex = index;
    this.changeGroupData(item.id);
    if (type == 'organ') {
      this.otherInfo = item;
      this.groupName = item.group_name;
      this.groupname = item.group_name;
      this.groupDetails = item.description;
    } else {
      this.otherInfo = item;
      this.groupName = item.specialityname;
      this.groupname = item.specialityname;
      this.groupDetails = item.description;
    }
    this.cdr.detectChanges();
  }

  conditionWise: any = [];
  setActiveType(type: any) {
    if (this.isBrowser) {
      $("#loader").show();
      this.activeIndex = 0;
      if (type === 'organ') {
        this.carusaltype = true;
        this._master.getLimsALlGroup(1).subscribe((res: any) => {
          $("#loader").hide();
          if (res.status == 1) {
            this.groupItem = res.data.filter((item: any) => item.status == 1);
            this.groupName = res.data[0].group_name;
            this.otherInfo = res.data[0];
            this.groupname = res.data[0].group_name;
            this.groupDetails = res.data[0].description;
            this.changeGroupData(res.data[0].id);
            this.cdr.detectChanges();
          }
        });
      } else {
        this.carusaltype = false;
        this._master.getConditionWise(1).subscribe((res: any) => {
          $("#loader").hide();
          if (res.status == 1) {
            this.conditionWise = res.data;
            this.groupName = res.data[0].specialityname;
            this.groupDetails = res.data[0].description;
            this.groupname = res.data[0].specialityname;
            this.otherInfo = res.data[0];
            this.changeGroupData(res.data[0].id);
            this.cdr.detectChanges();
          }
        });
      }
    }
  }

  onTabChange(event: Event) {
    const target = event.target as HTMLElement;
    if (target.id === 'nav-home-tab') {
      this.customOptions.reInit();
    } else if (target.id === 'nav-profile-tab') {
      this.customOptions2.reInit();
    }
  }

  next() {
    if (this.isBrowser) {
      const totalItems = this.navTabs.nativeElement.children.length;
      if (this.currentIndex < totalItems - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Loop back to the first tab
      }
      this.updateButtonsVisibility();
      this.scrollTabs();
      this.cdr.detectChanges();
    }
  }

  prev() {
    if (this.isBrowser) {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.navTabs.nativeElement.children.length - 1; // Loop back to the last tab
      }
      this.updateButtonsVisibility();
      this.scrollTabs();
      this.cdr.detectChanges();
    }
  }

  scrollTabs() {
    if (this.isBrowser) {
      const offset = this.navTabs.nativeElement.children[this.currentIndex].offsetLeft;
      this.renderer.setStyle(this.navTabs.nativeElement, 'transform', `translateX(-${offset}px)`);
      this.cdr.detectChanges();
    }
  }

  updateButtonsVisibility() {
    if (this.isBrowser) {
      const totalItems = this.navTabs.nativeElement.children.length;
      this.showPrevButton = totalItems > 1; // Always show prev button
      this.showNextButton = totalItems > 1; // Always show next button
      this.cdr.detectChanges();
    }
  }

  getPageDataById() {
    const payload = { page_id: 9 };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag();
        this.cdr.detectChanges();
      }
    });
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

  formattedName: any = '';
  blogDetails(id: string, name: any) {
    this.formattedName = name.replace(/[\s.,-]+/g, '-').trim();
    localStorage.setItem('BLOG_ID', id);
    this._router.navigate(['page/blog-details/' + this.formattedName]);
  }
}