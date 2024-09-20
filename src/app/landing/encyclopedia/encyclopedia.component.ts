import { Component, OnInit, PLATFORM_ID, Inject, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MasterService } from "../../service/master.service";
import { environment } from "../../../environments/environment";
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Pagination, Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-coverflow';

import 'swiper/swiper-bundle.css';

Swiper.use([Pagination, Navigation, EffectCoverflow, Autoplay]);

@Component({
  selector: "app-encyclopedia",
  templateUrl: "./encyclopedia.component.html",
  styleUrls: ["./encyclopedia.component.css"],
})
export class EncyclopediaComponent implements OnInit, AfterViewInit {
  products: any = [];
  ConditionWise: any = [];
  slides: any[] = []; // This will hold the dynamic slides from the API
  basePath = environment.BaseLimsApiUrl;
  activeModule: any = "organ wise";
  activeIndex: number | undefined;

  constructor(
    private _master: MasterService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Perform client-only operations here
      this.activeIndex = this._master.getActiveIndex();

      this.route.queryParams.subscribe((params) => {
        const queryIndex = params["activeIndex"];
        if (queryIndex) {
          this.activeIndex = +queryIndex;
          this._master.setActiveIndex(this.activeIndex);
        }
      });

      this._master.getLimsALlGroup(0).subscribe((res: any) => {
        if (res.status == 1) {
          this.products = res.data;
          this.initializeSwiper();
        }

      });

      // Fetch slides from the API
      // this._master.getSlides().subscribe((res: any) => {
      //   if (res.status == 1) {
      //     this.slides = res.data;
      //     this.initializeSwiper(); // Initialize the Swiper after slides are loaded
      //   }
      // });
    }
  }


 ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSwiper();
    }
  }

  initializeSwiper(): void {
    const swiper = new Swiper('.trending-slider', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: 4,
      loop: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 2000, // Adjust the delay as needed (in milliseconds)
        disableOnInteraction: false, // Allow autoplay to continue after user interaction
      },
    });
  }

  Condition(arg0: string) {
    this.activeModule = arg0;
    this._master.getConditionWise(0).subscribe((res: any) => {
      if (res.status == 1) {
        this.products = res.data;
      }
    });
  }

  organ(arg0: string) {
    this.activeModule = arg0;
    this._master.getLimsALlGroup(0).subscribe((res: any) => {
      if (res.status == 1) {
        this.products = res.data;
      }
    });
  }

  redirectSpeciality(item: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.activeIndex = item.id;
      this._master.setActiveIndex(this.activeIndex);
      this.router.navigate(["/science/encyclopedia"], {
        queryParams: { activeIndex:  this.activeIndex , activeModule:this.activeModule},
      });
      localStorage.setItem("encyclopedia" , JSON.stringify(item))
    }
  }
  // getStarsArray(rating: number): number[] {
  //   return Array(Math.round(rating)).fill(0);
  // }
}