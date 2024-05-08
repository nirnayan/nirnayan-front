import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MasterService } from 'src/app/service/master.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.css']
})
export class CustomerFeedbackComponent implements OnInit {

  allFeedback:any=[]
  basePath = environment.BaseLimsApiUrl


  constructor(
    private _master:MasterService,
  ) { }

  ngOnInit(): void {
    this._master.getAllFeedback().subscribe((res:any)=>{
      if(res.status===1)
        this.allFeedback=res.data;
        console.log(res);
      }
    )
  }
  // feedback: any[]=[
  //   {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:4},
  //   {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:5},
  //   {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:3},
  //   {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:2},
  //   {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:4},
  //   {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:5},
  //   {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:4},
  //   {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:1},
  //   {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:1},
  //   {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:4},
  //   {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:4},
  // ];
  generateStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('fa fa-star u-star');
      } else {
        stars.push('fa fa-star-o u-star');
      }
    }
    return stars;
  }
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 400,
    nav: true,
    navText: ["", ""],
    center: false,
    startPosition: 0,
    items: 4,
    responsive: {
      0: {
        items: 1, // 2 items for mobile devices
      },
      768: {
        items:2, // 3 items for tablets
      },
      900: {
        items: 4, // 5 items for larger screens
      },
    },
  };
}
