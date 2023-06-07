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

      $('.dropDwn').on('click', function() {
        $('.happen').removeClass("happen");
      });

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
