import { Component, OnInit, Inject, PLATFORM_ID, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css'],

})
export class OurTeamComponent implements OnInit {

  ourTemItem: any = [];
  doctorItem: any = [];
  isActive: any = 0;
  pageData: any;
  slectedTab: any;
  isBrowser: boolean;
  imge: any;
  name: any;
  subtitle: any;
  description: any;

  constructor(
    private _master: MasterService,
    private _spiner: NgxSpinnerService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private uiLoader : NgxUiLoaderService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.uiLoader.start()
      this.setupJQueryEvents();
      this.uiLoader.stop()
    }
    if (this.isBrowser) {
      this.uiLoader.start()
    this.getAllPages();
    this.getPageDataById();
    this.uiLoader.stop()
  }
  }

  setupJQueryEvents(): void {
    $(document).ready(() => {
      $('.teamTopButton span:first-child').on('click', () => {
        $('.teamMemberInner:first-child').addClass('active');
        $('.teamTopButton span:first-child').addClass('active');
        $('.teamMemberInner:nth-child(2)').removeClass('active');
        $('.teamTopButton span:nth-child(2)').removeClass('active');
      });
      $('.teamTopButton span:nth-child(2)').on('click', () => {
        $('.teamMemberInner:nth-child(2)').addClass('active');
        $('.teamTopButton span:nth-child(2)').addClass('active');
        $('.teamMemberInner:first-child').removeClass('active');
        $('.teamTopButton span:first-child').removeClass('active');
      });

      $(".blgTbHd").click(function(){
        $(".blgTbHd").removeClass("active show");
        $(this).addClass("active show");
        let tabId = $(this).attr("href");
        $(".blogTabs").removeClass("active show");
        $(`.blogTabs${tabId}`).addClass("active show");
      });
    });
  }

  getAllPages(): void {
    this._spiner.show();
    this.uiLoader.start()
    this._master.getPageContent().subscribe((res: any) => {
      this._spiner.hide();
      if (res.message == 'Success') {
        this.uiLoader.stop()
        let ourTem = res.data;
        for (let item of ourTem) {
          if (item.id == 3) {
            this.ourTemItem.push(item);
            this.getCatId(item['category'][0].item_id, '');
          }
        }
      }
      // $("#loader").hide();
    });
  }

  getCatId(catId: any, i: any): void {
    if (this.isBrowser) {
      this.uiLoader.start()
      if (catId === 7) {
        $(".otTabSec").addClass("show");
        $("#coreTeam").hide();
        $("#boardMem").show();
      } else {
        $(".otTabSec").removeClass("show");
        $("#boardMem").hide();
        $("#coreTeam").show();
      }
    }
    this.isActive = i;
    const formData = new FormData();
    formData.append('category_id', catId);
    this._master.getAllPost(formData).subscribe((res: any) => {
      this._spiner.hide();
      this.doctorItem = res.data;
      let item = this.doctorItem[0];
      this.onCLick(item.image, item.name, item.subtitle, item.description);
      // $("#loader").hide();
      this.uiLoader.stop()
    });
  }

  onCLick(img: any, name: any, subtitle: any, info: any): void {
    this.imge = img;
    this.name = name;
    this.subtitle = subtitle;
    this.description = info;
    this.slectedTab = name;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  SlideOptionn = {
    responsive: {
      0: { items: 1, dots: true },
      380: { items: 2 },
      500: { items: 3 },
      800: { items: 3 },
      1200: { items: 3 },
      1700: { items: 3 }
    },
    dots: false,
    nav: true
  };

  getPageDataById(): void {
    this.uiLoader.start()
    const payload = {
      page_id: 3
    };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status === 1) {
        this.uiLoader.start()
        this.pageData = res.data.seoContent;
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
