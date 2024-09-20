import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BlogService } from '../../service/blog.service';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import AOS from 'aos';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.css'],

})
export class AccreditationComponent implements OnInit {
  accreditation: any = [];
  pageItem: any = [];
  itemDetails: any;
  logos: any[] = [];
  selectedItem: any;
  selectedItemId: any;
  allAccred: any = [];
  pageData: any;

  // For checking platform
  isBrowser: boolean;
  acctdItem: any;

  constructor(
    private _master: MasterService,
    private _blog: BlogService,
    private router: Router,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private uiLoader:NgxUiLoaderService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if(this.isBrowser){
    this.uiLoader.start()
    AOS.init();
    this._master.getPageContent().subscribe((res: any) => {
      if (res.message == 'Success') {
        this.uiLoader.stop()
        this.pageItem = res.data.filter((item: any) => item.id == 6);
        if (this.isBrowser) {
          const loaderElement = document.querySelector("#loader") as HTMLElement;
          if (loaderElement) {
            loaderElement.style.display = 'none';
          }
        }
      }
    });

    this._blog.getallAccred().subscribe((res: any) => {
      if (res.message == 'Success') {
        this.uiLoader.stop()
        this.allAccred = res.data;
        this.logos = this.allAccred.filter((item: any) => item.status == 1);
        if (this.logos.length > 0) {
          this.showContent(this.logos[0]);
        }
      }
    });
    this.uiLoader.stop()
    this.getPageDataById();
  }
}

  showItem(item: any): void {
    this.acctdItem = item;
  }

  carouselOptions: any = {
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
      0: { items: 3 },
      400: { items: 3 },
      768: { items: 3 },
      900: { items: 3 },
    },
  };

  SlideOptionn = {
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      750: { items: 2 },
      1250: { items: 3 },
      1650: { items: 4 },
    },
    dots: true,
    nav: false,
    center: true,
  };

  showContent(item: any) {
    this.selectedItem = item;
    if (this.selectedItem) {
      this.selectedItemId = this.selectedItem.id;
    }
  }

  getPageDataById() {
    const payload = { page_id: 6 };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag();
      }
    });
  }

  changeTitleMetaTag() {
    if (this.pageData) {
      this.seoService.updateTitle(this.pageData.title);
      const metaTags = this.pageData.name.map((nameObj: any) => ({
        name: nameObj.title,
        content: nameObj.description
      }));
      this.seoService.updateMetaTags(metaTags);
      const propertyTags = this.pageData.propertyType.map((propertyObj: any) => ({
        property: propertyObj.title,
        content: propertyObj.description
      }));
      this.seoService.updatePropertyTags(propertyTags);
    }
  }
}
