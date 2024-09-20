import { Component, OnInit, Inject, PLATFORM_ID, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { SeoService } from '../../service/seo.service';
import { MasterService } from '../../service/master.service';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css'],

})
export class QualityComponent implements OnInit {
  pageData: any;

  SlideOptionn = {
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      750: {
        items: 3
      }
    },
    dots: true,
    nav: false
  };

  constructor(
    private _master: MasterService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private uiLoader : NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
      this.uiLoader.start()
      // Perform any browser-specific setup here if needed
    }
    this.getPageDataById();
    this.uiLoader.stop()
  }

  getPageDataById() {
    this.uiLoader.start()
    const payload = {
      page_id: 7
    };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status === 1) {
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
