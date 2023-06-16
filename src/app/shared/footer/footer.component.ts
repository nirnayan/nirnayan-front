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
      $('.footerBottom ul h2').on('click', function() {
        $(this).parent().children('li').slideToggle();
        $(this).parent().siblings().children('li').slideUp();
      });
    });
  }

}
