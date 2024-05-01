import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
@Component({
  selector: "app-encyclopedia",
  templateUrl: "./encyclopedia.component.html",
  styleUrls: ["./encyclopedia.component.css"],
})
export class EncyclopediaComponent implements OnInit {
  products: any[] = [
    { src: "../../../assets/images/Heart.png", text: "Heart" },
    { src: "../../../assets/images/Lungh.png", text: "Lung" },
    { src: "../../../assets/images/Kidney.png", text: "Kidney" },
    { src: "../../../assets/images/Liver.png", text: "Liver" },
    { src: "../../../assets/images/Thyroid.png", text: "Thyroid" },
    { src: "../../../assets/images/Heart.png", text: "Heart" },
    { src: "../../../assets/images/Lungh.png", text: "Lung" },
    { src: "../../../assets/images/Kidney.png", text: "Kidney" },
    { src: "../../../assets/images/Liver.png", text: "Liver" },
    { src: "../../../assets/images/Thyroid.png", text: "Thyroid" },
  ];
  activeModule: any = "Medical Encyclopedia";

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
    items: 5,
    responsive: {
      0: {
        items: 2, // 2 items for mobile devices
      },
      768: {
        items: 5, // 3 items for tablets
      },
      1000: {
        items: 5, // 5 items for larger screens
      },
      1300:{
        items: 5, // 5 items for larger screens
      }
    },
  };

  constructor() {}
  
  Package(arg0: string) {
    throw new Error("Method not implemented.");
  }
  Test(arg0: string) {
    throw new Error("Method not implemented.");
  }
  ngOnInit(): void {}
}
