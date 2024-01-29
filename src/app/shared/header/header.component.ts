import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { ProfileService } from 'src/app/service/profile.service';
import { environment } from 'src/environments/environment.prod';
declare var $: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  colourSet: any;
  showSearch: boolean = false;
  isLogin: boolean
  username: any = ''
  allCartItems: any
  public cartlist: number = 0
  locations: any
  profileImg:any 
  mediaUrl = environment.LimsEndpointBase


  constructor(private _router: Router,
    private _auth: AuthService,
    private _profile: ProfileService,
    private _cart: CartService) {

  }

  ngOnInit(): void {

    // if(this._auth.isLoggedIn() == false) {
    //   this._router.navigate(['/'])
    // }

    document.onclick = (args: any): void => {
      if (args.target.className == 'happen') {
        $('.happen').removeClass("happen");
        $('.dropDwn').removeClass("oppn");
        $(".dropSpn").removeClass("hov");
        $(".dropSpn").parent().parent("ul").removeClass("chngSave");
        $(".dropSpn").parent().parent("ul").removeClass("chngSavv");
      }
      if (this._router.url == '/search-filter') {
        this.showSearch = true;
      }
    }

    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= 100) {
        $(".topBar").addClass("fxdBar");
      } else {
        $(".topBar").removeClass("fxdBar");
      }
    });
    $(document).ready(function () {
      if($(window).width() < 1024)
    {
      $('.drp').on('click', function () {
        $(this).parent().children(".dropDwn").toggleClass("oppn");
        $(this).parent().children(".dropSpn").toggleClass("hov");
        $(this).parent().children(".dropSpn").parent().parent("ul").toggleClass("chngSave");
        $(this).parent().siblings().children(".dropSpn").parent().parent("ul").addClass("chngSavv");
        $(this).parent().siblings().children(".dropDwn").removeClass("oppn");
        $(this).parent().siblings().children(".dropSpn").removeClass("hov");
        $(".topBar").append("<div class='happen'></div>");
      });
    } else {

      $(".nav-item").hover(function () {
        $(this).children(".dropDwn").toggleClass("oppn");
        $(this).children(".dropSpn").toggleClass("hov");
        $(this).children(".dropSpn").parent().parent("ul").toggleClass("chngSave");
        $(this).siblings().children(".dropSpn").parent().parent("ul").removeClass("chngSavv");
        $(this).siblings().children(".dropDwn").removeClass("oppn");
        $(this).siblings().children(".dropSpn").removeClass("hov");
      });
    }

      $('.dropDwn').on('click', function () {
        $('.happen').removeClass("happen");
      });

      $('.profilePic').on('click', function () {
        $('.profileName').toggleClass("openn");
      });
      $('.profilePicc').on('click', function () {
        $('.profileNamee').toggleClass("openn");
      });

      $(".search").click(function () {
        $(".topBar").toggleClass('srchMod');
      });
    });

    this._router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });


    this.allCartItems = JSON.parse(localStorage.getItem('CART_ITEM'))
    this.username = localStorage.getItem('USER_NAME')
    this.isLogin = this._auth.isLoggedIn()
    // if (!this.isLogin) {
    //   this.logout()
    // }
    this.getLocation();

    this._auth.receiveQtyNumer().subscribe((res: any) => {
      this.cartlist = res
    })

    let paylod = {
      "schemaName": "nir1691144565",
      "user_id": Number(localStorage.getItem('USER_ID')),
      "location_id": Number(localStorage.getItem('LOCATION_ID'))
    }

    this._cart.getCartList(paylod).subscribe((res: any) => {
      if (res.status == 1) {
        this.cartlist = res.data.length
        this._cart.cartItem = this.cartlist
      } 
      else if(res.status == 403 || res.status == 503) {
        this._router.navigate(['/auth/login'])
      }
    })

    let payload = {
      schemaName: 'nir1691144565',
      user_id: Number(localStorage.getItem('USER_ID'))
    }

    if(this._profile.profile) {
      this.profileImg = this._profile.profile
    } else {
      this._profile.getProfileImg(payload).subscribe((res:any) => {
        if(res.status == 1) {
          this.profileImg = res.data.profile_picture
          this._profile.profile = this.profileImg
        }
      })
    }

    console.log(this.isLogin)
  }

  getLocation() {
    let ItemReq = {
      "schemaName": "nir1691144565"
    }
    if(this._profile.locationItem) {
      this.locations = this._profile.locationItem
    } else {
      this._profile.getAlllocations(ItemReq).subscribe((res:any) => {
        if(res.status == 1) {
          this.locations = res.data
          this._profile.locationItem = res.data
        }
      })
    }
  }
  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  selectLocation(state: any) {
    localStorage.setItem('LOCATION_ID', state)
  }

  logout() {
    localStorage.clear()
    this.isLogin = false
    this._router.navigate(['/about-us/our-journey'])
  }
}
