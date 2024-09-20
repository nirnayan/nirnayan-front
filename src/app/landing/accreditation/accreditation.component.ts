import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.css'],

})
export class AccreditationComponent implements OnInit {
  allAccred: any;
  isPublish: any = [];
  acctdItem: any = null;
  SlideOptionn = { 
    responsive: {
      0: { items: 1 },
      800: { items: 2 },
      1200: { items: 3 },
      1700: { items: 4 }
    },
    dots: true, 
    nav: false
  };

  constructor(
    private _blog: BlogService,
    private _spiner: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
      this.loadAccreditationData();
    }
  }

   loadAccreditationData(): void {
    this._blog.getallAccred().subscribe((res: any) => {
      if (res.message === 'Success') {
        this.allAccred = res.data;
        console.log('All Accreditation Data:', this.allAccred); // Debugging
        this.isPublish = this.allAccred.filter((item: any) => item.status == 1);
        console.log('Filtered Published Accreditation:', this.isPublish); // Debugging
        this.showItem(this.isPublish[0]);
      } else {
        console.error('Failed to fetch accreditation data:', res.message);
      }
    });
  }
  

  showItem(item: any): void {
    this.acctdItem = item;
  }
}
