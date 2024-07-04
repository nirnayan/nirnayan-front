import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from "../../../environments/environment";
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor , NgIf],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  buttonLabel: string = 'See All';
  notifications: any[] = [];
  message: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
    this.requestPermission();
    this.listen();
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
      this.message = payload;
      this.notificationService.addNotification(payload);
      console.log(this.message);
    });
  }

  clearNotifications() {
    this.notificationService.clearNotifications();
  }

  deleteNotification(index: any) {
    this.notificationService.deleteNotification(index);
  }
}
