import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { ProfileService } from './service/profile.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from "../environments/environment";
import { IndexedDbService } from './service/indexed-db-service.service';
import $ from 'jquery';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nirnayan';
  isLogin: boolean = false;
  showSearch: boolean = true;
  locations: any = [];
  message: any = null;
  isOnline: boolean = true;
  private firebaseApp: any;

  constructor(
    private swUpdate: SwUpdate,
    private _router: Router,
    private _profile: ProfileService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // this.initialize();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isOnline = navigator.onLine;
      this.initializeFirebase();
      this.setupBrowserSpecificFeatures();
    }
    this.getLocation();
    this.checkForUpdates();
  }

  private initializeFirebase(): void {
    try {
      this.firebaseApp = initializeApp(environment.firebase);
      this.requestPermission();
      this.listen();
    } catch (error) {
      console.error('Error initializing Firebase:', error);
    }
  }

  private setupBrowserSpecificFeatures(): void {
    // jQuery-related code
    $('.sideArrow').on('click', function () {
      $('.rightWhtBox').toggleClass("openn");
      $(this).toggleClass("open");
    });

    // Online/Offline listeners
    window.addEventListener('online', () => {
      this.isOnline = true;
      this._router.navigate(['/']);
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      this._router.navigate(['/others/no-internet']);
    });
  }

  // async initialize() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     setTimeout(async () => {
  //       await this.syncOrganWise();
  //       await this.syncConditionWise();
  //       await this.syncAllTestWise();
  //       await this.syncPackagesWise();
  //     }, 1000);
  //   }
  // }

  // async syncOrganWise() {
  //   await this.indexedDbService.syncDataFromApi('Organ_wise', 'https://limsapi.nirnayanhealthcare.com/global/getJSON?type=organ');
  // }

  // async syncConditionWise() {
  //   await this.indexedDbService.syncDataFromApi('condtion_wise', 'https://limsapi.nirnayanhealthcare.com/global/getJSON?type=condition');
  // }

  // async syncAllTestWise() {
  //   await this.indexedDbService.syncDataFromApi('allTestsList', 'https://limsapi.nirnayanhealthcare.com/global/getJSON?type=alltests');
  // }

  // async syncPackagesWise() {
  //   await this.indexedDbService.syncDataFromApi('allPackageList', 'https://limsapi.nirnayanhealthcare.com/global/getJSON?type=allpackages');
  // }

  checkForUpdates(): void {
    if (isPlatformBrowser(this.platformId) && this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(event => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
      this.swUpdate.checkForUpdate();
    }
  }

  selectLocation(state: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('LOCATION_ID', state);
    }
  }

  getLocation() {
    let ItemReq = {
      "schemaName": "nir1691144565"
    };

    this._profile.getAlllocations(ItemReq).subscribe((res: any) => {
      if (res.status == 1) {
        this.locations = res.data;
      }
    });
  }

  requestPermission() {
    if (this.firebaseApp) {
      const messaging = getMessaging(this.firebaseApp);
      getToken(messaging, { vapidKey: environment.firebase.vpaidKey })
        .then((currentToken) => {
          if (currentToken) {
            // console.log("Token received:", currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.error('An error occurred while retrieving token. ', err);
        });
    }
  }

  listen() {
    if (this.firebaseApp) {
      const messaging = getMessaging(this.firebaseApp);
      onMessage(messaging, (payload) => {
        this.message = payload;
        console.log('Message received:', payload);
      });
    }
  }
}