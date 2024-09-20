import { Component, OnInit, Inject, PLATFORM_ID, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { SeoService } from '../../service/seo.service';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css'],

})
export class AwardsComponent implements OnInit {
  award: any[] = [];
  awardData: any[] = [];
  basePath = environment.BaseLimsApiUrl;
  pageData: any;
  isBrowser: boolean;

  constructor(
    private _master: MasterService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private uiLoader:NgxUiLoaderService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if(this.isBrowser){
    this.uiLoader.start()
    this.getAllAward();
    this.getPageDataById();
    this.hideLoader()
    this.uiLoader.stop()
  }
}

  getAllAward() {
    this.uiLoader.start()
    this._master.getAllAward().subscribe((res: any) => {
      this.uiLoader.stop()
      this.awardData = res.data;
      for (let item of this.awardData) {
        if (item.status === 1) {
          this.award.push(item);
        }
      }
    });
  }

  getPageDataById() {
    const payload = {
      page_id: 8
    };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      this.uiLoader.stop()
      if (res.status === 1) {
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag();
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

  // Optional: Example method for DOM manipulation if needed
  private hideLoader(): void {
    if (this.isBrowser) {
      const loaderElement = this.renderer.selectRootElement("#loader", true) as HTMLElement;
      if (loaderElement) {
        this.renderer.setStyle(loaderElement, 'display', 'none');
      }
    }
  }
}
