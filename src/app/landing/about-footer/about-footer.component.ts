import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from '../../service/master.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about-footer',
  templateUrl: './about-footer.component.html',
  styleUrls: ['./about-footer.component.css'],

})
export class AboutFooterComponent implements OnInit, AfterViewInit {
  allPartners: any = [];

  ClientLogo: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 1
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 0,
    autoplaySpeed: 1000,
    autoplayHoverPause: false,
    items: 5
  };

  constructor(
    private _master: MasterService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.partners(11);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.startContinuousSliding();
      }, 1000);
    }
  }

  partners(id: any) {
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllPost(formData).subscribe((res: any) => {
      if (res.message === 'Success') {
        this.allPartners = [...res.data, ...res.data]; // Double the items for seamless loop
        // console.log('All Partners:', this.allPartners);
      }
    });
  }

  startContinuousSliding() {
    if (isPlatformBrowser(this.platformId)) {
      const stage = document.querySelector('.partners .owl-stage') as HTMLElement;
      if (stage) {
        let position = 0;
        const speed = 0.5; // Adjust the speed of the sliding here
        const stageWidth = stage.offsetWidth;
        const containerWidth = stage.parentElement ? stage.parentElement.offsetWidth : stageWidth;

        setInterval(() => {
          position -= speed;
          if (Math.abs(position) >= stageWidth - containerWidth) {
            position = 0;
          }

          stage.style.transform = `translateX(${position}px)`;
          stage.style.transition = 'transform 0.2s linear'; // Smooth transition effect
        }, 20);
      }
    }
  }
}
