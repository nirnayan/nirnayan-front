import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../service/notification.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  buttonLabel: string = 'See All';
  notifications: any[] = [];
  message: any;

  constructor(
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize Firebase
    if (isPlatformBrowser(this.platformId)) {
      const firebaseConfig = environment.firebase;
      initializeApp(firebaseConfig);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });

      this.requestPermission();
      this.listen();
    }
  }

  requestPermission() {
    if (isPlatformBrowser(this.platformId)) {
      const messaging = getMessaging();
      getToken(messaging, { vapidKey: environment.firebase.vpaidKey }).then(
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
  }

  listen() {
    if (isPlatformBrowser(this.platformId)) {
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        this.message = payload;
        this.notificationService.addNotification(payload);
        console.log(this.message);
      });
    }
  }

  clearNotifications() {
    this.notificationService.clearNotifications();
  }

  deleteNotification(index: any) {
    this.notificationService.deleteNotification(index);
  }
}
