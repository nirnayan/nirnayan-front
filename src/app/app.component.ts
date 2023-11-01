import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
declare var $: any; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nirnayan';
  
  constructor(private swUpdate: SwUpdate) {}


  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if(confirm("You're using an old version of the control panel. Want to update?")) {
          window.location.reload();
        }
      });
    }
    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
  
      if (scroll >= 100) {
          $("#google_translate_element").addClass("rmvFx");
      } else {
          $("#google_translate_element").removeClass("rmvFx");
      }
    });
    $("#google_translate_element a").removeAttr("href");
  }

}
