import { Component, OnInit, PLATFORM_ID, Inject, ChangeDetectionStrategy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from '../../service/master.service';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-awards-accolades',
  templateUrl: './awards-accolades.component.html',
  styleUrls: ['./awards-accolades.component.css'],

})
export class AwardsAccoladesComponent implements OnInit {
  basePath: string = environment.BaseLimsApiUrl;
  award: any[] = [];
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
        items: 3, // 3 items for tablets
      },
      900: {
        items: 4, // 4 items for larger screens
      },
    },
  };

  constructor(
    private _master: MasterService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Client-side code execution
      this.getAllAward();
    }
  }

  getAllAward() {
    this._master.getAllAward().subscribe((res: any) => {
      if (res.status === 1) {
        this.award = res.data;
      }
    });
  }
}
