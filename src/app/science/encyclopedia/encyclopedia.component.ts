import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
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

  // Condition Wise
  customOptions: any = {
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
        items: 1
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
      933:{
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

  isLogin : boolean = false;

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

  otherInfo:any = '' 
  groupname:any = ''
  pageData: any;

  constructor(private _master: MasterService, private renderer: Renderer2 , private seoService:SeoService , private _router:Router) { }

  ngOnInit(): void {
    AOS.init();

    $(document).ready(function () {
      $(".stpRow .mat-expansion-panel-header").click(function () {
        $(this).parent().parent('.stpRow').toggleClass('sgtp');
        $(this).parent().parent().siblings().removeClass('sgtp');
      });
    });

    this._master.getPageContent().subscribe((res: any) => {
      if (res.message === 'Success') {
        let pages = [];
        for (let item of res.data) {
          if (item.id === 17) {
            pages.push(item);
          }
          this.pageItem = pages;
        }
      }
    });

    this.getGroup();

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
    this.getPageDataById();
  }

  ngAfterViewInit(): void {
    this.updateButtonsVisibility();
  }

  getGroup() {
    $("#loader").show();
    this._master.getLimsALlGroup(1).subscribe((res: any) => {
      $("#loader").hide();
      if (res.status == 1) {
        // this.groupItem = res.data;
        this.groupItem = res.data.filter((item: any) => item.status == 1);
        console.log(this.groupItem)
        this.otherInfo = res.data[0]
        this.groupname = res.data[0].group_name
        this.changeGroupData(res.data[0].id);
      }
    });
  }

  groupInfo: any;
  changeGroupData(group_id: any) {
    const formData = new FormData();
    formData.append('group_id', group_id);
    if (this._master.encyclopediaItem) {
      this.groupInfo = this._master.encyclopediaItem;
    } else {
      this._master.getGroupWiseItem(formData).subscribe((res: any) => {
        let group = [];
        if (res.message === 'Success') {
          group.push(res.data);
        }
        this.groupInfo = group;
        this._master.encyclopediaItem = group;
      });
    }
  }

  onSubmitQuery() {
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
      if (res.message === 'Success') {
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
          enquiry_type: null
        };
        $("#loader").hide();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        $("#loader").hide();
      }
    }, err => {
      console.log(err);
      $("#loader").hide();
    });
  }

  setActiveIndex(index: number, type:any, item: any) {
    this.activeIndex = index;
    if(type == 'organ') {
      this.otherInfo = item
      this.groupName = item.group_name
      this.groupname = item.group_name
      this.groupDetails = item.description
    } else {
      this.otherInfo = item
      this.groupName = item.specialityname
      this.groupname = item.specialityname
      this.groupDetails = item.description
    }
  }

  conditionWise:any = []
  setActiveType(type: any) {
    $("#loader").show();
    this.activeIndex = 0;
    if (type === 'Organ') {
      this.carusaltype = true;
      this._master.getLimsALlGroup(1).subscribe((res: any) => {
        $("#loader").hide();
        if (res.status == 1) {
          this.groupItem = res.data.filter((item: any) => item.status == 1);
          this.groupName = res.data[0].group_name
          this.otherInfo = res.data[0]
          this.groupname = res.data[0].group_name
          this.groupDetails = res.data[0].description
          this.changeGroupData(res.data[0].id);
        }
      });
    } 
    else {
      this.carusaltype = false;
      this._master.getConditionWise(1).subscribe((res: any) => {
        $("#loader").hide();
        if (res.status == 1) {
          this.conditionWise = res.data;
          this.groupName = res.data[0].specialityname
          this.groupDetails = res.data[0].description
          this.groupname = res.data[0].specialityname
          this.otherInfo = res.data[0]
          console.log('this.otherInfo',this.conditionWise)
          this.changeGroupData(res.data[0].id);
        }
      })
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
    const totalItems = this.navTabs.nativeElement.children.length;
    if (this.currentIndex < totalItems - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the first tab
    }
    this.updateButtonsVisibility();
    this.scrollTabs();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.navTabs.nativeElement.children.length - 1; // Loop back to the last tab
    }
    this.updateButtonsVisibility();
    this.scrollTabs();
  }

  scrollTabs() {
    const offset = this.navTabs.nativeElement.children[this.currentIndex].offsetLeft;
    this.renderer.setStyle(this.navTabs.nativeElement, 'transform', `translateX(-${offset}px)`);
  }

  updateButtonsVisibility() {
    const totalItems = this.navTabs.nativeElement.children.length;
    this.showPrevButton = totalItems > 1; // Always show prev button
    this.showNextButton = totalItems > 1; // Always show next button
  }
  getPageDataById() {
    const payload = {
      page_id: 9
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
  formattedName: any = ''
  blogDetails(id: string, name: any) {
    console.log(id, name)
    this.formattedName = name.replace(/[\s.,-]+/g, '-').trim();
    localStorage.setItem('BLOG_ID', id);
    this._router.navigate(['page/blog-details/' + this.formattedName])
  }
}