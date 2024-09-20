import { Component, OnInit, Inject, PLATFORM_ID, Renderer2, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { CartService } from '../../service/cart.service';
import { NotificationService } from '../../service/notification.service';
import { ProfileService } from '../../service/profile.service';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { event } from 'jquery';
import { flush } from '@angular/core/testing';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('menuToggle') menuToggle!: ElementRef;
  @ViewChild('navigation') navigation!: ElementRef;
  colourSet: any;
  showSearch: boolean = false;
  isLogin: boolean;
  userfname: string = '';
  userlname: string = '';
  allCartItems: any;
  public cartlist: number = 0;
  locations: any;
  profileImg: any;
  mediaUrl = environment.LimsEndpointBase;
  isDropdownOpen: boolean = false;
  isDropdownOpensec: boolean = false;
  isDropdownOpenth: boolean = false;
  activePage: string = '';
  notificationCount: number = 0;
  displayStyle = "none";
  isMobile: boolean = false;
  isOpen: boolean = false
  routeUrl: any
  isDevelopment: any = ''
  isMenuOpen: boolean;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  userNumber: any;
  sideChange: boolean = false
  numberShow: any;
  timerInterval: NodeJS.Timeout;
  remainingTime: number = 30
  otpFrom: any = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: ""
  }




  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _profile: ProfileService,
    private _cart: CartService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isDevelopment = environment.developedFor
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._router.events.subscribe((event) => {
        this.routeUrl = event;
      });

      this._profile.receiveHeaderImg().subscribe((res: any) => {
        if (res) {
          this.profileImg = res
        }
        else {
          this.profileImg = localStorage.getItem('PROFILE_IMG')
        }
      })
      // Only access localStorage in the browser
      this.allCartItems = JSON.parse(localStorage.getItem('CART_ITEM') || '[]');
      console.log(this.allCartItems)
      this.userfname = localStorage.getItem('USER_FIRST_NAME') || '';
      this.userlname = localStorage.getItem('USER_LAST_NAME') || '';
      this.isLogin = this._auth.isLoggedIn();

      this._auth.receiveQtyNumer().subscribe((res: any) => {
        this.cartlist = res;
      });

      const payload = {
        "schemaName": "nir1691144565",
        "user_id": Number(localStorage.getItem('USER_ID')),
        "location_id": Number(localStorage.getItem('LOCATION_ID'))
      };

      this._cart.getCartList(payload).subscribe((res: any) => {
        if (res.status === 1) {
          this.cartlist = res.data.testCount;
          this._cart.cartItem = this.cartlist;
        } else if (res.status === 403 || res.status === 503) {
          this._router.navigate(['/']);
        }
      });

      this.getProfile();
    }

    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    this.notificationService.notifications$.subscribe(notifications => {
      this.notificationCount = notifications.length;
    });

    this.breakpointObserver.observe(['(max-width: 1024px)'])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
        //this.setupResponsiveBehavior();
      });
  }

  ngAfterViewInit(): void {
    this.initializeClientSideCode();
  }

  onKeyUp(event: KeyboardEvent, previousInput: HTMLInputElement | null, nextInput: HTMLInputElement | null): void {
    const key = event.key;

    if (isPlatformBrowser(this.platformId)) {
      if (key === 'Backspace' || key === 'ArrowLeft') {
        if (previousInput) {
          previousInput.focus();
        }
      } else if (/^[0-9a-zA-Z]$/.test(key) || key === 'ArrowRight') {
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  }

  initializeClientSideCode() {
    if (isPlatformBrowser(this.platformId)) {
      $('.header_wrap .menu-item-has-children > a').append('<span class="mean-expand"><i class="fa fa-chevron-down"></i></span>');
      $('.lt-sidebar .menu-item-has-children > a').append('<span class="mean-expand"><i class="fa fa-chevron-down"></i></span>');

      $('.mean-expand').on('click', function () {
        var $this = $(this);
        var $dropdownMenu = $this.closest('a').siblings('.dropdown_menu');
        $('.dropdown_menu').not($dropdownMenu).slideUp().removeClass('opened');
        $('.mean-expand').not($this).removeClass('opened');
        if (!$dropdownMenu.hasClass('opened')) {
          $dropdownMenu.slideDown().addClass('opened');
          $this.addClass('opened');
        } else {
          $dropdownMenu.slideUp().removeClass('opened');
          $this.removeClass('opened');
        }
      });


      $('.mb_menu').click(function () {
        $('.lt-sidebar').toggleClass('active');
      });
      $('.close_menu').click(function () {
        $('.lt-sidebar').removeClass('active');
      });

      let lastScrollTop = 0;
      jQuery(window).on('scroll', function () {
        let currentScrollTop = jQuery(window).scrollTop();
        if (jQuery(this).scrollTop() > 0) {
          jQuery('.fixed_sidebar').addClass('active');
        }
        else {
          jQuery('.fixed_sidebar').removeClass('active');
        }
        if (currentScrollTop < lastScrollTop) {
          jQuery('.fixed_sidebar').removeClass('active');
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
      });

      $("#signin").click(function () {  //use a class, since your ID gets mangled
        $('#login-modal').addClass("active");      //add the class to the clicked element
        console.log('click')
        $('body').addClass("lg-active");
      });

      $(".sign_popup_modal").click(function () {  //use a class, since your ID gets mangled
        $('#login-modal').addClass("active");      //add the class to the clicked element
        console.log('click')
        $('body').addClass("lg-active");
      });
      $(".log_pop_close").click(function () {  //use a class, since your ID gets mangled
        this.isSign = ''
        $('#login-modal').removeClass("active");      //add the class to the clicked element
        $('body').removeClass("lg-active");
      });


      $(".signup_click_btn").click(function () {  //use a class, since your ID gets mangled
        $('.signup-modal').addClass("active");      //add the class to the clicked element
        $('body').addClass("lg-active");
      });
      $(".signup_popup_close").click(function () {  //use a class, since your ID gets mangled
        this.isSign = ''
        $('.signup-modal').removeClass("active");      //add the class to the clicked element
        $('body').removeClass("lg-active");
      });




    }
  }

  setupResponsiveBehavior() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isMobile) {
        this.renderer.listen('document', 'click', (event: Event) => {
          const target = event.target as HTMLElement;
          if (target.classList.contains('drp')) {
            $(target).parent().children(".dropDwn").toggleClass("oppn");
            $(target).parent().children(".dropSpn").toggleClass("hov");
            $(target).parent().children(".dropSpn").parent().parent("ul").toggleClass("chngSave");
            $(target).parent().siblings().children(".dropSpn").parent().parent("ul").addClass("chngSavv");
            $(target).parent().siblings().children(".dropDwn").removeClass("oppn");
            $(target).parent().siblings().children(".dropSpn").removeClass("hov");
            $(".topBar").append("<div class='happen'></div>");
          }
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
    }
  }

  getProfile() {
    if (isPlatformBrowser(this.platformId)) {
      const userid = localStorage.getItem('USER_ID');
      if (this.isLogin) {
        this._profile.getProfileData(userid).subscribe((res: any) => {
          if (res.status === 1) {
            localStorage.setItem("USER_FIRST_NAME", JSON.stringify(res.data.first_name));
            localStorage.setItem("USER_LAST_NAME", JSON.stringify(res.data.last_name));
            this.userfname = res.data.first_name;
            this.userlname = res.data.last_name;
          }
        });
      } else {
        console.log('User not logged in');
      }
    }
  }

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
  redirectSearch(event: KeyboardEvent | null, query: string): void {
    if (event) {
      // Only trigger the search if Enter is pressed
      if (event.key !== 'Enter') return;
    }

    if (query && query.trim()) {
      this._router.navigate(['/search-filter'], { queryParams: { q: query.trim() } });
    }
  }
  redirectLogin() {
    this._router.navigate(['/auth/login']);
  }

  logout() {
    this._router.navigate(['/']);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }
  closeSignModal(){
    this.userNumber = null
    this.sideChange = false
  }
  isSign: any
  signin(sign: any) {
    this.isSign = sign
  }
  toggleMenu() {
    this.navigation.nativeElement.classList.toggle('active');
    this.isMenuOpen = !this.isMenuOpen;
  }
  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  getOTP() {
    const userName = this.userNumber;
    this._profile.getSignInOtp(userName).subscribe((res: any) => {
      if (res.status == 1) {
        this.sideChange = true
        this.numberShow = this.userNumber
        this.showToast('success', 'Success', `Your OTP is ${res.otpDets.otp}`);
      }
    }
    );
    this.startTimer();
  }

  showToast(icon: any, title: string, message: string) {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      toast: true,
      position: 'top-end',
      customClass: {
        popup: 'colored-toasts'
      },
      showConfirmButton: false,
      timer: 10000
    });
  }

  submitSignIn() {
    if(!this.otpFrom.otp1 && !this.otpFrom.otp2 && !this.otpFrom.otp3 && !this.otpFrom.otp4 && !this.otpFrom.otp5 && !this.otpFrom.otp6){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter all the Otp",
      })
      return
    }
    const otp = this.otpFrom.otp1 + this.otpFrom.otp2 + this.otpFrom.otp3 + this.otpFrom.otp4 + this.otpFrom.otp5 + this.otpFrom.otp6
    let payload = {
      "email_or_mobile": this.userNumber,
      "otp": otp
    };
    this._profile.signInWithOtp(payload).subscribe(res => {
      if (res.status == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Login Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('JWT_TOKEN', res.accessToken);
          localStorage.setItem('USER_NAME_FIRST', res.data.first_name);
          localStorage.setItem('USER_NAME_LAST', res.data.last_name);
          localStorage.setItem('USER_MOBILE', res.data.mobileNumber);
          localStorage.setItem('USER_EMAIL', res.data.email);
          localStorage.setItem('PROFILE_IMG', res.data.profile_picture);
          localStorage.setItem('USER_ID', res.data.id);
        }
      window.location.reload()
      } else {
        this.showToast('error', 'Oops...', `${res.data}`);
      }
    }, err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    });
  }
}
