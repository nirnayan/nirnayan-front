import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  buttonLabel: string = 'See All';
  notifications: any[] = [];
  message: any;

  ngOnInit(): void {
    this.loadNotificationsFromLocalStorage();
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
      this.message=payload;
      this.notifications.push(payload);
      this.saveNotificationsToLocalStorage();
      console.log(this.message);
      this.ngOnInit()
    });
  }

  clearNotifications() {
    this.notifications = [];
    localStorage.removeItem('notifications');
  }

  deleteNotification(index: any) {
    this.notifications.splice(index, 1);
    this.saveNotificationsToLocalStorage();
  }

  saveNotificationsToLocalStorage() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  loadNotificationsFromLocalStorage() {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      this.notifications = JSON.parse(savedNotifications);
    }
  }
}
