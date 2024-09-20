import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser for SSR
import AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-blog-slider',
  templateUrl: './blog-slider.component.html',
  styleUrls: ['./blog-slider.component.css'],

})
export class BlogSliderComponent implements OnInit {

  details: any;

  constructor(
    private _route: ActivatedRoute,
    private _master: MasterService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    this._route.params.subscribe((param: any) => {
      const formData = new FormData();
      formData.append('id', param.id);
      this._master.getBlogsById(formData).subscribe((res: any) => {
        if (isPlatformBrowser(this.platformId)) {
          $("#loader").hide();
        }
        if (res.message === 'Success') {
          this.details = res.data['most_viewed'];
        }
      }, err => {
        console.log(err);
        if (isPlatformBrowser(this.platformId)) {
          $("#loader").hide();
        }
      });
    });
  }

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 400,
    nav: false,
    navText: ["", ""],
    center: false,
    startPosition: 0,
    items: 4,
    responsive: {
      0: {
        items: 1, // 1 item for mobile devices
      },
      768: {
        items: 2, // 2 items for tablets
      },
      992: {
        items: 4, // 4 items for larger screens
      },
    },
  };
}
