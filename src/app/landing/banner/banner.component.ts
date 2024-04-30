import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { AuthService } from "src/app/service/auth.service";
import { MasterService } from "src/app/service/master.service";
import { ProfileService } from "src/app/service/profile.service";
import { environment } from "src/environments/environment";
declare var $: any;

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.css"],
})
export class BannerComponent implements OnInit {
  basepath = environment.BaseLimsApiUrl




  allPatients:any
  homePage: any = [];
  bannerItem: any = [];
  isBannerLoad: boolean = true;
  bannerData:any
  patientName:string
  patientDob:number
  patientAge:number
  selectedGender:any
  patientHeight:any
  patientWeight:any
  doctorName:string
  isLogin:boolean
  patientNameSec:string
  patientDobSec:any
  patientAgeSec:any
  patientGenderSec:any
  patientFile:any
  doctorNameSec:string


  
  constructor(private _master: MasterService,  private _auth: AuthService, private router:Router , private _profile :ProfileService) {}

  ngOnInit(): void {
    $('.slider').each(function() {
      var $this = $(this);
      var $group = $this.find('.slide_group');
      var $slides = $this.find('.slide');
      var bulletArray = [];
      var currentIndex = 0;
      var autoplayInterval; // Variable to hold autoplay interval
    
      function move(newIndex) {
        var animateLeft, slideLeft;
    
        // Stop autoplay when manually moving the slides
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
    
        $slides.eq(newIndex).css({
          display: 'block',
          left: slideLeft
        });
        $group.animate({
          left: animateLeft
        }, function() {
          $slides.eq(currentIndex).css({
            display: 'none'
          });
          $slides.eq(newIndex).css({
            left: 0
          });
          $group.css({
            left: 0
          });
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
    
      $.each($slides, function(index) {
        var $button = $('<a class="slide_btn">&bull;</a>');
    
        if (index === currentIndex) {
          $button.addClass('active');
        }
        $button.on('click', function() {
          move(index);
        }).appendTo('.slide_buttons');
        bulletArray.push($button);
      });
    
      // Start autoplay
      startAutoplay();
    
      // Stop autoplay on bullet button click
      $('.slide_buttons').on('click', '.slide_btn', function() {
        clearInterval(autoplayInterval);
      });
    });    
    $('.custom-slider').each(function() {
      var $this = $(this);
      var $group = $this.find('.slide_group');
      var $slides = $this.find('.slide');
      var bulletArray = [];
      var currentIndex = 0;
      var timeout;
  
      function move(newIndex) {
          var animateLeft, slideLeft;
  
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
  
          $slides.eq(newIndex).css({
              display: 'block',
              left: slideLeft
          });
          $group.animate({
              left: animateLeft
          }, function() {
              $slides.eq(currentIndex).css({
                  display: 'none'
              });
              $slides.eq(newIndex).css({
                  left: 0
              });
              $group.css({
                  left: 0
              });
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
  
      $.each($slides, function(index) {
          var $button = $('<a class="slide_btn2">&bull;</a>');
  
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
  this.getAllPatient();
  this.getAllBanner();
  this.isLogin = this._auth.isLoggedIn()
  }
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
    autoplay:true,
    responsive: {
      0: {
        items: 1, // 2 items for mobile devices
      },
      768: {
        items: 1, // 3 items for tablets
      },
      900: {
        items: 1, // 5 items for larger screens
      },
    },
  };


  getAllBanner(){
    const data = "website"
    this._master.getBannerContent(data).subscribe(
      (res:any)=>{
        this.bannerData = res.data;
        console.log(res.data)
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }
  
  bannerSubmit() {
    console.log('hii')
  }


  redirectLogin(){
    this.router.navigate(['/auth/login'])
  }


  bookSubmit(){

  }


  getAllPatient(){
    let payload2 = {
      schemaName: 'nir1691144565',
      user_id: Number(localStorage.getItem('USER_ID'))
    }

    this._profile.getPatient(payload2).subscribe((res:any) => {
      if(res.status==1) {
        this.allPatients = res.data
      }
    })
  }


  UploadPrescription() {
    const formData = new FormData();
    formData.append('prescription_name', this.patientNameSec);
    formData.append('prescription_dob', this.patientDobSec);
    formData.append('prescription_age', this.patientAgeSec);
    formData.append('prescription_gender', this.patientGenderSec);
    formData.append('prescription_file', this.patientFile);
    formData.append('prescription_doctor_name', this.doctorNameSec);

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
