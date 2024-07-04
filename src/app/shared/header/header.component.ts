import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { NotificationService } from 'src/app/service/notification.service';
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
  userfname: any = ''
  userlname: any = ''
  allCartItems: any
  public cartlist: number = 0
  locations: any
  profileImg: any
  mediaUrl = environment.LimsEndpointBase
  isDropdownOpen: boolean = false;
  isDropdownOpensec: boolean = false;
  isDropdownOpenth: boolean = false;
  activePage: string = '';
  notificationCount: number = 0;
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _profile: ProfileService,
    private _cart: CartService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {

    this._profile.receiveHeaderImg().subscribe((res: any) => {
      if (res) {
        this.profileImg = res
      } else {
        this.profileImg = localStorage.getItem('PROFILE_IMG')
      }
    })

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
      if ($(window).width() < 1024) {
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

      // Click event for '.profilePic' class
      $('.profilePic').on('click', function (event) {
        $('.profileName').toggleClass("openn");
        $('.loginSec').toggleClass("blkk");
        event.stopPropagation(); // Prevent event propagation to the document
      });
      // Click event for '.profilePicc' class
      $('.profilePicc').on('click', function (event) {
        $('.profileNamee').toggleClass("openn");
        $('.loginSec').toggleClass("blkk");
        event.stopPropagation(); // Prevent event propagation to the document
      });

      // Click event for the document
      $(document).on('click', function (event) {
        if (!$(event.target).closest('.profilePic').length && !$(event.target).closest('.profilePicc').length) {
          $('.loginSec').removeClass("blkk");
        }
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
    this.userfname = localStorage.getItem('USER_FIRST_NAME')
    this.userlname = localStorage.getItem('USER_LAST_NAME')
    this.isLogin = this._auth.isLoggedIn()
    // if (!this.isLogin) {
    //   this.logout()
    // }

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
        this.cartlist = res.data.testCount
        this._cart.cartItem = this.cartlist
      }
      else if (res.status == 403 || res.status == 503) {
        this._router.navigate(['/'])
      }
    })
    // let payload = {
    //   schemaName: 'nir1691144565',
    //   user_id: Number(localStorage.getItem('USER_ID'))
    // }

    // if(this._profile.profile) {
    //   this.profileImg = this._profile.profile
    // } else {
    //   this._profile.getProfileImg(payload).subscribe((res:any) => {
    //     if(res.status == 1) {
    //       this.profileImg = res.data.profile_picture
    //       this._profile.profile = this.profileImg
    //     }
    //   })
    // }
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activePage = event.url;
      });
    this.getProfile()

    this.notificationService.notifications$.subscribe(notifications => {
      this.notificationCount = notifications.length;
    });

    // REHAN START
    var containerMenu = document.querySelector('.containerMenu');
    // containerMenu.addEventListener('click', function () {
    //   this.classList.toggle('change');
    // });
    // REHAN END

  }

  getProfile() {
    let userid = localStorage.getItem('USER_ID')
    if (this.isLogin) {
      this._profile.getProfileData(userid).subscribe((res: any) => {
        if (res.status == 1) {
          localStorage.setItem("USER_FIRST_NAME", JSON.stringify(res.data.first_name))
          localStorage.setItem("USER_LAST_NAME", JSON.stringify(res.data.last_name))
          this.userfname = res.data.first_name
          this.userlname = res.data.last_name
        }
      })
    }
    else {
      console.log('user not Login')
    }
  }

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  redirectLogin() {
    this._router.navigate(['/auth/login']);
  }


  logout() {
    this._router.navigate(['/'])
    localStorage.clear()
    setTimeout(() => {
      location.reload()
    }, 1000);

    // this._profile.logMeOut().subscribe((res: any) => {
    //   if (res.status == 1) {
    //     this.isLogin = false

    //     setTimeout(() => {
    //       location.reload()
    //     }, 1000);
    //   }
    // });
  }



}
