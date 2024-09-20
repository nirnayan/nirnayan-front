import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<any[]>(this.loadNotificationsFromLocalStorage());
  notifications$ = this.notificationsSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  addNotification(notification: any) {
    const notifications = this.notificationsSubject.value;
    notifications.push(notification);
    this.saveNotificationsToLocalStorage(notifications);
    this.notificationsSubject.next(notifications);
  }

  clearNotifications() {
    const notifications: any[] = [];
    this.saveNotificationsToLocalStorage(notifications);
    this.notificationsSubject.next(notifications);
  }

  deleteNotification(index: number) {
    const notifications = this.notificationsSubject.value;
    notifications.splice(index, 1);
    this.saveNotificationsToLocalStorage(notifications);
    this.notificationsSubject.next(notifications);
  }

  private saveNotificationsToLocalStorage(notifications: any[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }

  private loadNotificationsFromLocalStorage(): any[] {
    if (isPlatformBrowser(this.platformId)) {
      const savedNotifications = localStorage.getItem('notifications');
      return savedNotifications ? JSON.parse(savedNotifications) : [];
    }
    return [];
  }
}
