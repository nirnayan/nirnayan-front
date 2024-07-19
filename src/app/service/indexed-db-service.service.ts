import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db: IDBDatabase;
  constructor(private http: HttpClient) {
    this.openDatabase();
  }

  public async openDatabase() {
    const request = window.indexedDB.open('Nirnayan-DB', 4);

    request.onupgradeneeded = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      this.db.createObjectStore('Organ_wise', { keyPath: 'id', autoIncrement: true });
      // this.db.createObjectStore('condtion_wise', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      console.log('IndexedDB opened successfully');
    };

    request.onerror = (event) => {
      console.error('Error opening IndexedDB', event);
    };
  }

  isDbConnected(): boolean {
    return !!this.db;
  }



  async addItem(item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('collections', 'readwrite');
      const objectStore = transaction.objectStore('collections');
      const request = objectStore.add({
        test_name: 'HIV 2',
        test_code: 'HI545455',
        test_description: 'HIV Test',
        test_price: 2000,
        test_duration: 14,
        test_status: 'active'
      });

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async updateItem(item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('collections', 'readwrite');
      const objectStore = transaction.objectStore('collections');
      const request = objectStore.put(item);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async deleteItem(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('collections', 'readwrite');
      const objectStore = transaction.objectStore('collections');
      const request = objectStore.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async syncOrganWiseApi(): Promise<void> {
    try {
      const apiData = await this.http.get<any[]>('https://limsapi.nirnayanhealthcare.com/global/getJSON?type=organ').toPromise();

      // Clear existing items in IndexedDB
      await this.clearAllItems('Organ_wise');

      // Add new items from API to IndexedDB
      const transaction = this.db.transaction('Organ_wise', 'readwrite');
      const objectStore = transaction.objectStore('Organ_wise');
      for (const item of apiData) {
        objectStore.add(item);
      }

      console.log('Organ_wise Sync from API to IndexedDB completed');
    } catch (error) {
      console.error('Error syncing data from API to IndexedDB', error);
      throw error;
    }

  }
  async syncConditionWsieApi(): Promise<void> {
    try {
      const apiData = await this.http.get<any[]>('https://limsapi.nirnayanhealthcare.com/global/getJSON?type=condition').toPromise();

      // Clear existing items in IndexedDB
      await this.clearAllItems('condtion_wise');

      // Add new items from API to IndexedDB
      const transaction = this.db.transaction('condtion_wise', 'readwrite');
      const objectStore = transaction.objectStore('condtion_wise');
      for (const item of apiData) {
        objectStore.add(item);
      }

      console.log('condtion_wise Sync from API to IndexedDB completed');
    } catch (error) {
      console.error('Error syncing data from API to IndexedDB', error);
      throw error;
    }

  }

  async getOrganWiseData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('Organ_wise', 'readonly');
      const objectStore = transaction.objectStore('Organ_wise');
      const request = objectStore.getAll();

      console.log('Organ_wise opened successfully',request);
      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }
  async getConditionWiseData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('condtion_wise', 'readonly');
      const objectStore = transaction.objectStore('condtion_wise');
      const request = objectStore.getAll();

      console.log('condtion_wise opened successfully',request);
      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }


  private async clearAllItems(item:string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db.transaction(item, 'readwrite');
      const objectStore = transaction.objectStore(item);
      const request = objectStore.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

}
