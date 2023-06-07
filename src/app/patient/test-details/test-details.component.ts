import { Component, OnInit } from '@angular/core';
declare var $: any;
import AOS from 'aos';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
    $(document).ready(function() {
      $('.parameterBoxHead').on('click', function() {
        $(this).parent(".parameterBox").toggleClass("open");
        $(this).parent().siblings().removeClass("open");
      });
    });
  }

}
