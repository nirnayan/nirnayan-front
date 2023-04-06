import { Component, OnInit } from '@angular/core';
declare var $: any;  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
  
      if (scroll >= 100) {
          $(".topBar").addClass("fxdBar");
      } else {
          $(".topBar").removeClass("fxdBar");
      }
    });
    $(document).ready(function() {
      $('.labMenu').on('click', function() {
        $('.laborDoc').toggleClass("oppn");
        $('.labMenu').toggleClass("hov");
        $('.labMenu').parent().parent("ul").toggleClass("chngSave");
        $('.abtMenu').parent().parent("ul").removeClass("chngSavv");
        $('.abtDoc').removeClass("oppn");
        $('.abtMenu').removeClass("hov");
        $('.ptnMenu').parent().parent("ul").removeClass("chngSaav");
        $('.ptnDoc').removeClass("oppn");
        $('.ptnMenu').removeClass("hov");
      });
      $('.abtMenu').on('click', function() {
        $('.abtDoc').toggleClass("oppn");
        $('.abtMenu').toggleClass("hov");
        $('.abtMenu').parent().parent("ul").toggleClass("chngSavv");
        $('.labMenu').parent().parent("ul").removeClass("chngSave");
        $('.laborDoc').removeClass("oppn");
        $('.labMenu').removeClass("hov");
        $('.ptnMenu').parent().parent("ul").removeClass("chngSaav");
        $('.ptnDoc').removeClass("oppn");
        $('.ptnMenu').removeClass("hov");
      });
      $('.ptnMenu').on('click', function() {
        $('.ptnDoc').toggleClass("oppn");
        $('.ptnMenu').toggleClass("hov");
        $('.ptnMenu').parent().parent("ul").toggleClass("chngSaav");
        $('.abtMenu').parent().parent("ul").removeClass("chngSavv");
        $('.abtDoc').removeClass("oppn");
        $('.abtMenu').removeClass("hov");
        $('.labMenu').parent().parent("ul").removeClass("chngSave");
        $('.laborDoc').removeClass("oppn");
        $('.labMenu').removeClass("hov");
      });
      $('.clse, .slBgIm, .depart, .abtDoc a, .laborDoc a, .ptnDoc a, .laborDocInnerRghtImBox, .ptnDoc .laborDocInnerLft h3, .navbar-expand-lg .navbar-nav .nav-item:nth-child(3n) .nav-link, .navbar-expand-lg .navbar-nav .nav-item:nth-child(5) .nav-link, .navbar-expand-lg .navbar-nav .nav-item:nth-child(7) .nav-link, .navbar-expand-lg .navbar-nav .nav-item:nth-child(8) .nav-link').on('click', function() {
        $('.abtDoc, .laborDoc, .ptnDoc').removeClass("oppn");
        $('.abtMenu, .labMenu, .ptnMenu').removeClass("hov");
        $('.abtMenu').parent().parent("ul").removeClass("chngSavv");
        $('.labMenu').parent().parent("ul").removeClass("chngSave");
        $('.ptnMenu').parent().parent("ul").removeClass("chngSaav");
        $('.navbar-collapse').removeClass("show");
      });
      $('.profilePic').on('click', function() {
        $('.profileName').toggleClass("openn");
      });

      $( ".search" ).click(function() {
        $( ".topBar" ).toggleClass('srchMod');
      });
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
