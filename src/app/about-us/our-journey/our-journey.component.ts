import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 
import { MasterService } from 'src/app/service/master.service';
import { SeoService } from 'src/app/service/seo.service';
declare var $: any;


@Component({
  selector: 'app-our-journey',
  templateUrl: './our-journey.component.html',
  styleUrls: ['./our-journey.component.css']
})
export class OurJourneyComponent implements OnInit {
  pageData: any;

  constructor(
    private _master:MasterService,
    private seoService:SeoService
  ) { }

  ngOnInit(): void {
    AOS.init();

    setTimeout(()=>{
      $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 70) {
            $(".journeyAnimate").addClass("startAnimate");
        } else {
            $(".journeyAnimate").removeClass("startAnimate");
        }
      });
      $(document).ready(function() {
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:first-child').addClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(2)').addClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .dott:nth-child(3)').addClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').addClass("active");
        });
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:first-child').addClass("active");
  
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').addClass("active");
  
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').addClass("active");
  
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:first-child .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').addClass("active");
        });
  
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:first-child').addClass("active");
  
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').addClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').addClass("active");
        });
  
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:first-child').addClass("active");
  
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(2)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .dott:nth-child(3)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(2) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').addClass("active");
        });
  
  
  
  
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:first-child').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .dott:nth-child(3)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:nth-child(2) .journeyColumnn:nth-of-type(4)').addClass("active");
        });
  
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:first-child').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:first-child').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(2)').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(2)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').addClass("active");
        });
        $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(3)').on('click', function() {
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:first-child').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .dott:nth-child(3)').addClass("active");
  
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(2)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(3)').removeClass("active");
          $('.journeyAnimateRow:nth-child(3) .journeyColumnnOuter:first-child .journeyColumnn:nth-of-type(4)').addClass("active");
        });
  
      });
  
      
    },0)
    this.getPageDataById()
  }
  getPageDataById() {
    const payload = {
      page_id: 2
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
