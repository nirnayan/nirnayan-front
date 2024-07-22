import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {
  award:any = [];
  awardData:any []
  basePath = environment.BaseLimsApiUrl
  pageData: any;
  constructor(
    private _master :MasterService,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.getAllAward();
    this.getPageDataById();
  }
  getAllAward() {
    
    this._master.getAllAward().subscribe((res:any)=>{
      this.awardData=res.data
     for(let item of this.awardData){
      if(item.status === 1){
        this.award.push(item)
      }
     }
    })
  }
  getPageDataById() {
    const payload = {
      page_id: 8
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
