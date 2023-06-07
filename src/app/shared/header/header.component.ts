import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
declare var $: any;  


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  colourSet:any;


  constructor(private _router: Router) { }

  ngOnInit(): void {
    document.onclick=(args:any): void=>{
      console.log(args);
      if(args.target.className=='happen'){
        $('.happen').removeClass("happen");
        $('.dropDwn').removeClass("oppn");
        $(".dropSpn").removeClass("hov");
        $(".dropSpn").parent().parent("ul").removeClass("chngSave");
        $(".dropSpn").parent().parent("ul").removeClass("chngSavv");
      }
    }

    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
  
      if (scroll >= 100) {
          $(".topBar").addClass("fxdBar");
      } else {
          $(".topBar").removeClass("fxdBar");
      }
    });
    $(document).ready(function() {
      $('.drp').on('click', function() {
        $(this).children(".dropDwn").toggleClass("oppn");
        $(this).children(".dropSpn").toggleClass("hov");
        $(this).children(".dropSpn").parent().parent("ul").toggleClass("chngSave");
        $(this).siblings().children(".dropSpn").parent().parent("ul").addClass("chngSavv");
        $(this).siblings().children(".dropDwn").removeClass("oppn");
        $(this).siblings().children(".dropSpn").removeClass("hov");
        $(".topBar").append("<div class='happen'></div>");
      });

      // $('.labMenu').on('click', function() {
      //   $('.laborDoc').toggleClass("oppn");
      //   $('.labMenu').toggleClass("hov");
      //   $('.labMenu').parent().parent("ul").toggleClass("chngSave");
      //   $('.abtMenu').parent().parent("ul").removeClass("chngSavv");
      //   $('.abtDoc').removeClass("oppn");
      //   $('.abtMenu').removeClass("hov");
      //   $('.ptnMenu').parent().parent("ul").removeClass("chngSaav");
      //   $('.ptnDoc').removeClass("oppn");
      //   $('.ptnMenu').removeClass("hov");
      //   $(".topBar").append("<div class='happen'></div>");
      // });

      // $('.abtMenu').on('click', function() {
      //   $('.abtDoc').toggleClass("oppn");
      //   $('.abtMenu').toggleClass("hov");
      //   $('.abtMenu').parent().parent("ul").toggleClass("chngSavv");
      //   $('.labMenu').parent().parent("ul").removeClass("chngSave");
      //   $('.laborDoc').removeClass("oppn");
      //   $('.labMenu').removeClass("hov");
      //   $('.ptnMenu').parent().parent("ul").removeClass("chngSaav");
      //   $('.ptnDoc').removeClass("oppn");
      //   $('.ptnMenu').removeClass("hov");
      // });
      // $('.ptnMenu').on('click', function() {
      //   $('.ptnDoc').toggleClass("oppn");
      //   $('.ptnMenu').toggleClass("hov");
      //   $('.ptnMenu').parent().parent("ul").toggleClass("chngSaav");
      //   $('.abtMenu').parent().parent("ul").removeClass("chngSavv");
      //   $('.abtDoc').removeClass("oppn");
      //   $('.abtMenu').removeClass("hov");
      //   $('.labMenu').parent().parent("ul").removeClass("chngSave");
      //   $('.laborDoc').removeClass("oppn");
      //   $('.labMenu').removeClass("hov");
      // });
      $('.dropDwn').on('click', function() {
        $('.happen').removeClass("happen");
      });
      // $('.clse, .slBgIm, .depart, .abtDoc a, .laborDoc a, .ptnDoc a, .laborDocInnerRghtImBox, .ptnDoc .laborDocInnerLft h3, .navbar-expand-lg .navbar-nav .nav-item:nth-child(3n) .nav-link, .navbar-expand-lg .navbar-nav .nav-item:nth-child(5) .nav-link, .navbar-expand-lg .navbar-nav .nav-item:nth-child(7) .nav-link, .navbar-expand-lg .navbar-nav .nav-item:nth-child(8) .nav-link').on('click', function() {
      //   $('.abtDoc, .laborDoc, .ptnDoc').removeClass("oppn");
      //   $('.abtMenu, .labMenu, .ptnMenu').removeClass("hov");
      //   $('.abtMenu').parent().parent("ul").removeClass("chngSavv");
      //   $('.labMenu').parent().parent("ul").removeClass("chngSave");
      //   $('.ptnMenu').parent().parent("ul").removeClass("chngSaav");
      //   $('.navbar-collapse').removeClass("show");
      //   $('.happen').removeClass("happen");
      // });
      $('.profilePic').on('click', function() {
        $('.profileName').toggleClass("openn");
      });

      $( ".search" ).click(function() {
        $( ".topBar" ).toggleClass('srchMod');
      });
    });
    
    this._router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });

  }
  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }



}
