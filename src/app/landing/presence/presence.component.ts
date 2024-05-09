import { Component, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    $('.country .growScrollRow').on('click', function () {
      $('.growthSec').toggleClass("animt");
    });

    // You can add more event listeners here if needed

    $.fn.jQuerySimpleCounter = function (options) {
      var settings = $.extend({
        start: 0,
        end: '100',
        easing: 'swing',
        duration: 4000, // Adjust duration as needed for better animation
        complete: ''
      }, options);
    
      var thisElement = $(this);
    
      // Define a function to parse the end value
      function parseEndValue(value) {
        if (typeof value === 'string' && value.includes('+')) {
          return parseInt(value.replace('+', ''));
        } else {
          return parseInt(value);
        }
      }
    
      var endValue = parseEndValue(settings.end);
    
      $({ count: settings.start }).animate({ count: endValue }, {
        duration: settings.duration,
        easing: settings.easing,
        step: function () {
          var mathCount;
          if (typeof settings.end === 'string' && settings.end.includes('+')) {
            mathCount = Math.ceil(this.count).toLocaleString() + '+';
          } else {
            mathCount = Math.ceil(this.count).toLocaleString();
          }
          thisElement.text(mathCount);
        },
        complete: settings.complete
      });
    };
    
    
    $(document).ready(function () {
      $('#number1').jQuerySimpleCounter({ end: '5000+', duration: 2000 });
      $('#number2').jQuerySimpleCounter({ end: '3000+', duration: 2000 });
      $('#number3').jQuerySimpleCounter({ end: '100+', duration: 2000 });
    });
    
  }
}
