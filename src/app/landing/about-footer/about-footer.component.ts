import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-about-footer',
  templateUrl: './about-footer.component.html',
  styleUrls: ['./about-footer.component.css']
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

  constructor(private _master: MasterService) {}

  ngOnInit() {
    this.partners(11);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.startContinuousSliding();
    }, 1000);
  }

  partners(id: any) {
    const formData = new FormData();
    formData.append('category_id', id);
    this._master.getAllPost(formData).subscribe((res: any) => {
      if (res.message == 'Success') {
        this.allPartners = [...res.data, ...res.data]; // Double the items for seamless loop
        console.log('All Partners:', this.allPartners);
      }
    });
  }

  startContinuousSliding() {
    const stage = document.querySelector('.partners .owl-stage') as HTMLElement;
    if (stage) {
      let position = 0;
      setInterval(() => {
        position -= 1;
        stage.style.transform = `translateX(${position}px)`;
        if (Math.abs(position) >= stage.offsetWidth / 2) {
          position = 0;
        }
      }, 20);
    }
  }
}