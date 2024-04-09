import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.css']
})
export class CustomerFeedbackComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  feedback: any[]=[
    {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:4},
    {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:5},
    {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:3},
    {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:2},
    {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:4},
    {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:5},
    {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:4},
    {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:1},
    {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:1},
    {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:4},
    {image:"../../../assets/images/feedback.png" , name:"Rakhes Jhunjhunwala", desc:"Practices that prioritize patient safety, quality of care, and positive outcomes. services." ,rating:4},
  ];
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
}
