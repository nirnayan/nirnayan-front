import { Component, OnInit, Inject, PLATFORM_ID, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import AOS from 'aos'; 
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $: any;

@Component({
  selector: 'app-our-journey',
  templateUrl: './our-journey.component.html',
  styleUrls: ['./our-journey.component.css'],

})
export class OurJourneyComponent implements OnInit {
  pageData: any;
  isBrowser: boolean;

  constructor(
    private _master: MasterService,
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
      AOS.init();
      setTimeout(() => {
        this.initializeJQuery();
      }, 0);
      this.getPageDataById();
      this.uiLoader.stop()
    }
  }

  initializeJQuery() {
    $(window).scroll(() => {
      var scroll = $(window).scrollTop();
      if (scroll >= 70) {
        $(".journeyAnimate").addClass("startAnimate");
      } else {
        $(".journeyAnimate").removeClass("startAnimate");
      }
    });

    $(document).ready(() => {
      this.setupJQueryClickHandlers();
    });
  }

  setupJQueryClickHandlers() {
    const updateClasses = (rowIndex: number, columnIndex: number) => {
      $(`.journeyAnimateRow:nth-child(${rowIndex}) .journeyColumnnOuter:nth-child(${columnIndex}) .dott`).removeClass("active");
      $(`.journeyAnimateRow:nth-child(${rowIndex}) .journeyColumnnOuter:nth-child(${columnIndex}) .dott:nth-child(${columnIndex})`).addClass("active");

      $(`.journeyAnimateRow:nth-child(${rowIndex}) .journeyColumnnOuter:nth-child(${columnIndex}) .journeyColumnn`).removeClass("active");
      $(`.journeyAnimateRow:nth-child(${rowIndex}) .journeyColumnnOuter:nth-child(${columnIndex}) .journeyColumnn:nth-of-type(${columnIndex})`).addClass("active");
    };

    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 2; j++) {
        $(`.journeyAnimateRow:nth-child(${i}) .journeyColumnnOuter:nth-child(${j}) .dott`).each((index, element) => {
          $(element).on('click', () => {
            updateClasses(i, index + 1);
          });
        });
      }
    }
  }

  getPageDataById() {
    this.uiLoader.start()
    const payload = { page_id: 2 };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.uiLoader.stop()
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag();
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
}
