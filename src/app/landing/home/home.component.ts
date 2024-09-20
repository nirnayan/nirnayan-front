import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../service/seo.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  pageData: any;
  isDevelopment:any = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private _master: MasterService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) { }

  ngOnInit(): void {
    this.isDevelopment = environment.developedFor
    if (isPlatformBrowser(this.platformId)) {
      this.getPageDataById()
    }
  }

  getPageDataById() {
    const payload = {
      page_id: 1
    }
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.pageData = res.data.seoContent;
        console.log( res.data.seoContent)
        this.changeTitleMetaTag()
      }
    })
  }


  changeTitleMetaTag() {
    if (this.pageData) {

      this.seoService.updateTitle(this.pageData.title);

      const metaTags = this.pageData.name.map((nameObj: { title: any; description: any; }) => ({
        name: nameObj.title,
        content: nameObj.description
      }));
      this.seoService.updateMetaTags(metaTags);

      const propertyTags = this.pageData.propertyType.map((propertyObj: { title: any; description: any; }) => ({
        property: propertyObj.title,
        content: propertyObj.description
      }));
      this.seoService.updatePropertyTags(propertyTags);
    }
  }

}

