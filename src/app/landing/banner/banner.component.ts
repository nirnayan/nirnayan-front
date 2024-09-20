import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { AuthService } from "../../service/auth.service";
import { MasterService } from "../../service/master.service";
import { ProfileService } from "../../service/profile.service";
import { environment } from "../../../environments/environment";
import { Store } from '@ngxs/store';
import { LoadBanners, ProductState } from "../../store/Product_State";
import { Observable } from "rxjs";
import { Select } from '@ngxs/store';
import { BannerResponse } from '../../Interface/BannerInt';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.css"],

})
export class BannerComponent implements OnInit {
  basepath = environment.BaseLimsApiUrl;
  allPatients: any;
  homePage: any = [];
  bannerItem: any = [];
  isBannerLoad: boolean = true;
  banners!: Observable<any[]>;
  bannerData: any = [];
  isLogin!: boolean;
  patientFile: any;
  bookTest: FormGroup;
  PrescriptionUpload: FormGroup;
  isDevelopment: any = ''

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
    nav: false,
    navText: ["", ""],
    center: false,
    startPosition: 0,
    items: 4,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      900: {
        items: 1,
      },
    },
  };

  @Select(ProductState.getBanner) banners$!: Observable<BannerResponse[]>;

  constructor(
    private _master: MasterService,
    private _auth: AuthService,
    private router: Router,
    private _profile: ProfileService,
    private fb: FormBuilder,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.bookTest = this.fb.group({
      prescription_name: ['', Validators.required],
      prescription_dob: ['', Validators.required],
      prescription_age: ['', Validators.required],
      patient_Gender: ['', Validators.required],
      patient_Height: ['', Validators.required],
      patient_Weight: ['', Validators.required],
      doctor_Name: ['', Validators.required],
    });

    this.PrescriptionUpload = this.fb.group({
      prescription_name: ['', Validators.required],
      prescription_dob: ['', Validators.required],
      prescription_age: ['', Validators.required],
      patient_Gender: ['', Validators.required],
      doctor_Name: ['', Validators.required],
    });

    this.isDevelopment = environment.developedFor
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllBanner();
      this.initializeSlider();
      this.getAllPatient();
      this.isLogin = this._auth.isLoggedIn();
    }
  }

  initializeSlider(): void {
    if (!isPlatformBrowser(this.platformId)) return;
  
    const $ = (window as any).jQuery; // Ensure jQuery is available
  
    $('.slider').each(function(this: any) { // Explicitly type 'this'
      const $this = $(this);
      const $group = $this.find('.slide_group');
      const $slides = $this.find('.slide');
      const bulletArray: any[] = [];
      let currentIndex = 0;
      let autoplayInterval: any;
  
      function move(newIndex: number) {
        let animateLeft, slideLeft;
  
        clearInterval(autoplayInterval);
  
        if ($group.is(':animated') || currentIndex === newIndex) {
          return;
        }
  
        bulletArray[currentIndex].removeClass('active');
        bulletArray[newIndex].addClass('active');
  
        if (newIndex > currentIndex) {
          slideLeft = '100%';
          animateLeft = '-100%';
        } else {
          slideLeft = '-100%';
          animateLeft = '100%';
        }
  
        $slides.eq(newIndex).css({ display: 'block', left: slideLeft });
        $group.animate({ left: animateLeft }, function() {
          $slides.eq(currentIndex).css({ display: 'none' });
          $slides.eq(newIndex).css({ left: 0 });
          $group.css({ left: 0 });
          currentIndex = newIndex;
        });
      }
  
      function startAutoplay() {
        autoplayInterval = setInterval(function() {
          if (currentIndex < ($slides.length - 1)) {
            move(currentIndex + 1);
          } else {
            move(0);
          }
        }, 4000);
      }
  
      $.each($slides, function(index: number) {
        const $button = $('<a class="slide_btn">&bull;</a>');
  
        if (index === currentIndex) {
          $button.addClass('active');
        }
        $button.on('click', function() {
          move(index);
        }).appendTo('.slide_buttons');
        bulletArray.push($button);
      });
  
      startAutoplay();
      $('.slide_buttons').on('click', '.slide_btn', function() {
        clearInterval(autoplayInterval);
      });
    });
  
    $('.custom-slider').each(function(this: any) { // Explicitly type 'this'
      const $this = $(this);
      const $group = $this.find('.slide_group');
      const $slides = $this.find('.slide');
      const bulletArray: any[] = [];
      let currentIndex = 0;
      let timeout: any;
  
      function move(newIndex: number) {
        let animateLeft, slideLeft;
  
        advance();
  
        if ($group.is(':animated') || currentIndex === newIndex) {
          return;
        }
  
        bulletArray[currentIndex].removeClass('active');
        bulletArray[newIndex].addClass('active');
  
        if (newIndex > currentIndex) {
          slideLeft = '100%';
          animateLeft = '-100%';
        } else {
          slideLeft = '-100%';
          animateLeft = '100%';
        }
  
        $slides.eq(newIndex).css({ display: 'block', left: slideLeft });
        $group.animate({ left: animateLeft }, function() {
          $slides.eq(currentIndex).css({ display: 'none' });
          $slides.eq(newIndex).css({ left: 0 });
          $group.css({ left: 0 });
          currentIndex = newIndex;
        });
      }
  
      function advance() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          if (currentIndex < ($slides.length - 1)) {
            move(currentIndex + 1);
          } else {
            move(0);
          }
        }, 4000);
      }
  
      $this.find('.next_btn').on('click', function() {
        if (currentIndex < ($slides.length - 1)) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      });
  
      $this.find('.previous_btn').on('click', function() {
        if (currentIndex !== 0) {
          move(currentIndex - 1);
        } else {
          move(3);
        }
      });
  
      $.each($slides, function(index: number) {
        const $button = $('<a class="slide_btn2">&bull;</a>');
  
        if (index === currentIndex) {
          $button.addClass('active');
        }
        $button.on('click', function() {
          move(index);
        }).appendTo('.slide_buttons2');
        bulletArray.push($button);
      });
  
      advance();
    });
  }
  

  getAllBanner() {
    this.banners$.subscribe({
      next: (banners) => {
        if (!banners.length) {
          this.store.dispatch(new LoadBanners());
        }
        this.bannerData = banners;
      }
    });
  }

  bannerSubmit() {
    console.log('hii');
  }

  redirectLogin() {
    this.router.navigate(['/auth/login']);
  }

  bookSubmit() {}

  getAllPatient() {
    let payload2 = {
      schemaName: 'nir1691144565',
      user_id: Number(localStorage.getItem('USER_ID'))
    };

    this._profile.getPatient(payload2).subscribe((res: any) => {
      if (res.status == 1) {
        this.allPatients = res.data;
      }
    });
  }

  UploadPrescription() {
    const formData = new FormData();
    let form = this.PrescriptionUpload.value;
    formData.append('schemaName', "nir1691144565");
    formData.append('prescription_name', form.prescription_name);
    formData.append('prescription', this.patientFile);
    formData.append('remarks', '');

    this._master.uploadPrescription(formData).subscribe(
      (res: any) => {
        console.log(res.data);
      },
      (err: any) => {
        console.log(err.data);
      }
    );
  }

  patientFileSec(event: any) {
    this.patientFile = event.target.files[0];
  }
}
