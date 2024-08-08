import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos';
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';
declare var $: any;


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  SlideOption = { responsive:{
    0:{
        items:1
    },
    799:{
      items:2
    },
    1200:{
        items:3
    },

  }, dots: true, nav: false};
  
  eventItem:any 
  eventList:any = []
  pageData: any;
  formarEvent:any = []

  
  constructor(private _master: MasterService,
    private _route: ActivatedRoute , private seoService:SeoService) { }

  ngOnInit(): void {
    AOS.init();
    this._route.params.subscribe((param:any) => {
      const formData = new FormData();
      formData.append('id', param.id);
      this._master.getEventsById(formData).subscribe((res:any) => {
        $("#loader").hide();
        if(res.status == 200) {
          this.eventItem = res.data
        }
      })
    })

    this._master.getEvents().subscribe((res:any) => {
      $("#loader").hide();
      if(res.status == 200) {
        this.eventList = res.data['upcoming']
      }
    })
    this.isFormer();
    this.getPageDataById();
  }


  async isFormer() {
    this._master.getEvents().subscribe((res: any) => {
      if (res.status == 200) {
        this.formarEvent = res.data['former'].filter(element => element.status == 1);
      }
    }, err => {
      console.log(err)
    })
  }


  getPageDataById() {
    const payload = {
      page_id: 19
    }
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if(res.status == 1){
        this.pageData = res.data.seoContent;
        this.changeTitleMetaTag()
      }
    })
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
