import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],

})
export class AboutComponent implements OnInit {

  selectedTag: any;
  currentRoute: string;
  pageData: any;
  isBrowser: boolean;

  constructor(
    private router: Router,
    private _master: MasterService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private uiLoader:NgxUiLoaderService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if(this.isBrowser){
      this.uiLoader.start()
      this.getPageDataById();
      this.uiLoader.stop()
    }
}

  getPageDataById() {
    this.uiLoader.start()
    const payload = {
      page_id: 4
    };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.uiLoader.stop()
        this.pageData = res.data.seoContent;
        if (this.isBrowser) {
          this.changeTitleMetaTag();
        }
      }
    });
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
