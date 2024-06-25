import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { ProfileService } from './service/profile.service';
declare var $: any;
import { SwPush } from '@angular/service-worker';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { EventManager } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nirnayan';
  isLogin: boolean = false;
  showSearch: boolean = true;
  locations: any = []
  message:any = null;
  isOnline: boolean = navigator.onLine;

  constructor(private swUpdate: SwUpdate,
    private _router: Router, private _profile: ProfileService,
    private eventManager: EventManager) 
    { 
      // if (this.swUpdate.isEnabled) {
      //   this.swUpdate.available.subscribe(() => {
      //     if (confirm("You're using an old version of the control panel. Want to update?")) {
      //       window.location.reload();
      //     }
      //   });
      // }

      if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(event => {
          if (confirm('A new version is available. Load new version?')) {
            window.location.reload();
          }
        });
      }
    }


  ngOnInit(): void {
  
    $('.sideArrow').on('click', function () {
      $('.rightWhtBox').toggleClass("openn");
      $(this).toggleClass("open");
    });
    // $(window).scroll(function() {    
    //   var scroll = $(window).scrollTop();

    //   if (scroll >= 100) {
    //       $("#google_translate_element").addClass("rmvFx");
    //   } else {
    //       $("#google_translate_element").removeClass("rmvFx");
    //   }
    // });

    // this.swPush.messages.subscribe((message: any) => {
    //   console.log('message', message)
    // })
    this.requestPermission();
    this.listen();
    window.addEventListener('online', () => {
      this.isOnline = true;
      this._router.navigate(['/']);
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this._router.navigate(['/others/no-internet']);
    });
    this.getLocation()
  }

  selectLocation(state: any) {
    localStorage.setItem('LOCATION_ID', state)
  }

  getLocation() {
    let ItemReq = {
      "schemaName": "nir1691144565"
    }

    this._profile.getAlllocations(ItemReq).subscribe((res: any) => {
      if (res.status == 1) {
        this.locations = res.data

      }
    })
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vpaidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      this.message=payload;
    });
  }
}
