import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';
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
  cartlist: any = []
  state = [
    {
      key: 'AN',
      name: 'Andaman and Nicobar Islands',
    },
    {
      key: 'AP',
      name: 'Andhra Pradesh',
    },
    {
      key: 'AR',
      name: 'Arunachal Pradesh',
    },
    {
      key: 'AS',
      name: 'Assam',
    },
    {
      key: 'BR',
      name: 'Bihar',
    },
  ]

  constructor(private _router: Router,
    private _auth: AuthService,
    private _profile: ProfileService) {
    this.allCartItems = JSON.parse(localStorage.getItem('CART_ITEM'))
  }

  ngOnInit(): void {
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
      $('.drp').on('click', function () {
        $(this).parent().children(".dropDwn").toggleClass("oppn");
        $(this).parent().children(".dropSpn").toggleClass("hov");
        $(this).parent().children(".dropSpn").parent().parent("ul").toggleClass("chngSave");
        $(this).parent().siblings().children(".dropSpn").parent().parent("ul").addClass("chngSavv");
        $(this).parent().siblings().children(".dropDwn").removeClass("oppn");
        $(this).parent().siblings().children(".dropSpn").removeClass("hov");
        $(".topBar").append("<div class='happen'></div>");
      });

      $(".nav-item").hover(function () {
        $(this).children(".dropDwn").toggleClass("oppn");
        $(this).children(".dropSpn").toggleClass("hov");
        $(this).children(".dropSpn").parent().parent("ul").toggleClass("chngSave");
        $(this).siblings().children(".dropSpn").parent().parent("ul").removeClass("chngSavv");
        $(this).siblings().children(".dropDwn").removeClass("oppn");
        $(this).siblings().children(".dropSpn").removeClass("hov");
      });

      $('.dropDwn').on('click', function () {
        $('.happen').removeClass("happen");
      });

      $('.profilePic').on('click', function () {
        $('.profileName').toggleClass("openn");
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

    this.username = localStorage.getItem('USER_NAME')
    this.isLogin = this._auth.isLoggedIn()
    if (!this.isLogin) {
      this.logout()
    }


    this._auth.receiveQtyNumer().subscribe((res: any) => {
      this.allCartItems = res
      console.log('qty', res)
    })

    let paylod = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    this._profile.getCartList(paylod).subscribe((res: any) => {
      if (res.status == 1) {
        this.cartlist = res.data.length
      }
    })
  }
  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  selectLocation(state: any) {
    console.log(state)
  }
  logout() {
    localStorage.clear()
    this.isLogin = false
    this._router.navigate(['/'])
  }
}
