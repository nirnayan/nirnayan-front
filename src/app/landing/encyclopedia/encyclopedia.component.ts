import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { MasterService } from "src/app/service/master.service";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-encyclopedia",
  templateUrl: "./encyclopedia.component.html",
  styleUrls: ["./encyclopedia.component.css"],
})
export class EncyclopediaComponent implements OnInit {
  products: any=[] 
  ConditionWise:any=[]
  basePath = environment.BaseLimsApiUrl
  activeModule: any = "organ wise";

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
      1300: {
        items: 5, // 5 items for larger screens
      }
    },
  };

  constructor(
    private _master: MasterService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this._master.getLimsALlGroup().subscribe((res: any) => {
      if (res.status == 1) {
        this.products = res.data
      }
    })
  }
  Condition(arg0: string) {
    this.activeModule = arg0;
    this._master.getConditionWise().subscribe((res:any)=>{
      console.log(res.data)
      if(res.status == 1){
        this.ConditionWise = res.data
      }
    })
  }
  organ(arg0: string) {
    this.activeModule = arg0;
    this._master.getLimsALlGroup().subscribe((res: any) => {
      if (res.status == 1) {
        this.products = res.data
      }
    })
  }
  redirectSpeciality(){
    this.router.navigate(['/science/encyclopedia'])
  }
}
