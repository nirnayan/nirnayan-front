import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';


@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css']
})
export class QualityComponent implements OnInit {
  pageData: any;

  constructor(
    private _master : MasterService,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    // $('body').removeClass('mat-typography');
    AOS.init();
    this.getPageDataById()
  }
  SlideOptionn = { responsive:{
    0:{
        items:1
    },
    600:{
      items:2
    },
    750:{
        items:3
    },

  }, dots: true, nav: false}; 

  getPageDataById() {
    const payload = {
      page_id: 7
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
