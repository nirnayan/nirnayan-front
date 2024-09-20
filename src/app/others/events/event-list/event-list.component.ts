import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser for SSR
import AOS from 'aos';
import { MasterService } from '../../../service/master.service';
import { SeoService } from '../../../service/seo.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],

})
export class EventListComponent implements OnInit {
  eventList: any = [];
  eventListFormer: any;
  isUpcomingEvents: boolean = true;
  isFormerEvents: boolean = false;
  eventType = 'Former';

  SlideOptionn = {
    loop: true,
    responsive: {
      0: {
        items: 2
      },
      470: {
        items: 2
      },
      1200: {
        items: 4
      },
    },
    dots: false,
    nav: true
  };

  SlideOption = {
    responsive: {
      0: {
        items: 1
      },
      799: {
        items: 2
      },
      1200: {
        items: 3
      },
    },
    dots: true,
    nav: false
  };
  
  pageData: any;

  constructor(
    private _master: MasterService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object, // Inject PLATFORM_ID to check platform
    private uiLoader:NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init(); // Initialize AOS only in the browser

      window.onload = () => {
        $(".blgTbHd").click(function () {
          $(".blgTbHd").removeClass("active show");
          $(this).addClass("active show");
          let tabId = $(this).attr("href");
          $(".blogTab").removeClass("active show");
          $(`.blogTab${tabId}`).addClass("active show");
        });
      };
    }

    this.isFormer();
    this.getPageDataById();
  }

  isUpcoming() {
    this.isFormerEvents = false;
    this.isUpcomingEvents = true;
    this.eventType = 'Upcoming';

    if (isPlatformBrowser(this.platformId)) {
      // $("#loader").show();
      this.uiLoader.start('master')
    }

    this._master.getEvents().subscribe((res: any) => {
      if (res.status == 200) {
        const upcomingItem = res.data['upcoming'].filter(element => element.status == 1);
        this.eventList = upcomingItem;
      }
      if (isPlatformBrowser(this.platformId)) {
        // $("#loader").hide();
        this.uiLoader.stop('master')
      }
    }, err => {
      console.log(err);
      if (isPlatformBrowser(this.platformId)) {
        // $("#loader").hide();
        this.uiLoader.stop('master')
      }
    });
  }
  
  async isFormer() {
    this.isFormerEvents = true;
    this.isUpcomingEvents = false;
    this.eventType = 'Former';

    if (isPlatformBrowser(this.platformId)) {
      // $("#loader").show();
      this.uiLoader.start('master')
    }

    this._master.getEvents().subscribe((res: any) => {
      if (res.status == 200) {
        const formerItem = res.data['former'].filter(element => element.status == 1);
        this.eventListFormer = formerItem;
      }
      if (isPlatformBrowser(this.platformId)) {
        // $("#loader").hide();
        this.uiLoader.stop('master')
      }
    }, err => {
      console.log(err);
      if (isPlatformBrowser(this.platformId)) {
        // $("#loader").hide();
        this.uiLoader.stop('master')
      }
    });
  }

  getPageDataById() {
    const payload = {
      page_id: 18
    };
    this._master.getDataPageById(payload).subscribe((res: any) => {
      if (res.status == 1) {
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
