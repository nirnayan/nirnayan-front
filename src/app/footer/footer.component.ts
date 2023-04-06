import { Component, OnInit } from '@angular/core';
declare var $: any; 

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.footerBottom ul:first-child h2').on('click', function() {
        $('.footerBottom ul:first-child h2').parent().children('li').slideToggle();
        $('.footerBottom ul:nth-child(2) h2').parent().children('li').slideUp();
        $('.footerBottom ul:nth-child(3) h2').parent().children('li').slideUp();
      });
      $('.footerBottom ul:nth-child(2) h2').on('click', function() {
        $('.footerBottom ul:nth-child(2) h2').parent().children('li').slideToggle();
        $('.footerBottom ul:first-child h2').parent().children('li').slideUp();
        $('.footerBottom ul:nth-child(3) h2').parent().children('li').slideUp();
      });
      $('.footerBottom ul:nth-child(3) h2').on('click', function() {
        $('.footerBottom ul:nth-child(3) h2').parent().children('li').slideToggle();
        $('.footerBottom ul:first-child h2').parent().children('li').slideUp();
        $('.footerBottom ul:nth-child(2) h2').parent().children('li').slideUp();
      });
    });
  }

}
