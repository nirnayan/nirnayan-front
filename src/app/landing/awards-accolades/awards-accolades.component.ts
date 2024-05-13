import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from 'src/app/service/master.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-awards-accolades',
  templateUrl: './awards-accolades.component.html',
  styleUrls: ['./awards-accolades.component.css']
})
export class AwardsAccoladesComponent implements OnInit {
  basePath:string=environment.BaseLimsApiUrl

  constructor(
    private _master: MasterService
  ) { }

  ngOnInit(): void {
    this.getAllAward();
  }
  award: any[] = [
    // { image: "../../../assets/images/award-img1.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },
    // { image: "../../../assets/images/award-img2.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },
    // { image: "../../../assets/images/award-img3.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },
    // { image: "../../../assets/images/award-img4.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },
    // { image: "../../../assets/images/award-img1.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },
    // { image: "../../../assets/images/award-img2.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },
    // { image: "../../../assets/images/award-img3.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },
    // { image: "../../../assets/images/award-img4.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },
    // { image: "../../../assets/images/award-img1.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },
    // { image: "../../../assets/images/award-img2.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },
    // { image: "../../../assets/images/award-img3.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },
    // { image: "../../../assets/images/award-img4.png", desc: "and practices that prioritize patient safety, quality of care, and positive outcomes. services." },

  ];
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
        items: 2, // 2 items for mobile devices
      },
      768: {
        items: 3, // 3 items for tablets
      },
      900: {
        items: 4, // 5 items for larger screens
      },
    },
  };
  getAllAward() {
    this._master.getAllAward().subscribe((res:any)=>{
      console.log(res.data)
      this.award=res.data
    })
  }
}
