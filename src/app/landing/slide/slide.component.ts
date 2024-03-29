import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import AOS from 'aos';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { MasterService } from 'src/app/service/master.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  SlideOptions = {
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
        items: 1
      },
      600: {
        items: 1
      },
      900: {
        items: 3
      },
      1000: {
        items: 3
      },
      1650: {
        items: 4
      }
    }
  };


  SldSecOne: boolean = true;
  data: any;
  testItems: any;
  packageItems: any = [];
  activeModule: any = "Popular Test";
  testWithParamtr: any = [];
  cartTestArr: any = []
  public cartlist:any = []
  isLogin: boolean

  constructor(private _master: MasterService,
    private _auth: AuthService,
    private _profile: ProfileService,
    private _router: Router,
    private _cart: CartService,
    private router:Router) { }

  ngOnInit(): void {
    $("#loader").hide();
    AOS.init();
    this.Test('Popular Test');
    // $("#loader").show();
    // if (this._master.testMasterItem) {
    //   this.testItems = this._master.testMasterItem
    // } else {
    //   this._master.getTestMaster().subscribe((res: any) => {
    //     if (res.message == 'Success') {
    //       this.testItems = Object.entries(res.data.tests);
    //       this._master.testMasterItem = Object.entries(res.data.tests);
    //     }
    //   }, err => {
    //     console.log(err);
    //     $("#loader").hide();
    //   })
    // }
    // this.homePageTest(36)
    
    const state = 36; 
    const limit = 6; 
    const lastId = 0; 
    this._master.getAllNewTests(state,limit,lastId).subscribe((res:any) => {
      if(res.status==1) {
        this.testItems = res.data
      }
    })
    
  
    this.isLogin = this._auth.isLoggedIn()
    $(document).ready(function () {
      $('.pPkg').on('click', function () {
        $(this).addClass("active");
        $('.pTest').addClass("inactive");
      });
      $('.pTest').on('click', function () {
        $('.pPkg').removeClass("active");
        $(this).removeClass("inactive");
      });
    })

    let payload1 = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": Number(localStorage.getItem('LOCATION_ID'))
    }
    this._cart.getCartList(payload1).subscribe((res:any) => {
      if(res.status == 1) {
        this.cartlist = res.data
      }
      else if(res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    })
  }
  redirectItems(item: any) {
    this.router.navigate(['/patient/test-details', item.id]);
}

  // homePageTest(state: number) {
  //   this._cart.getHomePageTest(state).subscribe(
  //     (response: any) => {
  //       // Handle successful response
  //     },
  //     (error: any) => {
  //       // Handle error
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }


  Test(data: any) {
    this.activeModule = "Popular Test";
    this.data = data;
    this.SldSecOne = true;
  };

  parameter: any = [];
  Package(data: any) {
    $("#loader").show();
    this.activeModule = "Popular Packages";
    this.data = data;
    this.SldSecOne = false;
    if (this._master.packageItem) {
      this.packageItems = this._master.packageItem
      $("#loader").hide();
    } else {
      this._master.getPackageMaster().subscribe((res: any) => {
        if (res.message == 'Success') {
          $("#loader").hide();
          this.packageItems = res.data;
          this._master.packageItem = res.data
        }
      }, err => {
        console.log(err);
        $("#loader").hide();
      })
    }
  };

   addToCart(itemId: any, type: any,amount:any) {
    let test = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID'),
      "patient_id": 0,
      "prod_type": type,
      "prod_id": itemId,
      "price": amount,
      "location_id": localStorage.getItem('LOCATION_ID')
    }

    this.cartTestArr.push(test)
    this._cart.addToCart(test).subscribe((res:any) => {
      if(res) {
        this._auth.sendQtyNumber(this.cartlist.length + 1);
        this.ngOnInit()
      }
    })

  }

}
