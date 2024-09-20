import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jquery'; // Import jQuery

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor( 
  @Inject(DOCUMENT) private document: Document , 
  @Inject(PLATFORM_ID) private platformId: Object,
  private router : Router
) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    $(document).ready(function() {
      $('.footerBottom ul h2').on('click', function() {
        $(this).parent().children('li').slideToggle();
        $(this).parent().siblings().children('li').slideUp();
      });
    });
  }
}
redirectEncyclopedia(activeIndex: any, activeModule: any){
  this.router.navigate(["/science/encyclopedia"], {
    queryParams: { activeIndex: activeIndex , activeModule:activeModule},
  });
}
}
