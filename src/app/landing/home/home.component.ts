import { Component, OnInit } from '@angular/core';
import {SeoService} from '../../service/seo.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private _master :MasterService
  ) { }

  ngOnInit(): void {
    this.getPageDataById()
  }

  getPageDataById() {
    const payload = {
      page_id: 1
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

  }

