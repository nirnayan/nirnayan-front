import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db: IDBDatabase;

  constructor(private http: HttpClient) { 
    this.openDatabase();
    console.log('open database')
  }

  private async openDatabase() {
    const request = window.indexedDB.open('Nirnayan-DB', 1);

    request.onupgradeneeded = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      this.db.createObjectStore('collections', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      console.log('IndexedDB opened successfully');
    };

    request.onerror = (event) => {
      console.error('Error opening IndexedDB', event);
    };
  }

  async getAllItems(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('collections', 'readonly');
      const objectStore = transaction.objectStore('collections');
      const request = objectStore.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
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

  async syncDataFromApi(): Promise<void> {
    try {
      const apiData = await this.http.get<any[]>('https://limsapi.nirnayanhealthcare.com/global/getJSON?type=organ&product=test').toPromise();
      
      // Clear existing items in IndexedDB
      // await this.clearAllItems();
  
      // Add new items from API to IndexedDB
      const transaction = this.db.transaction('collections', 'readwrite');
      const objectStore = transaction.objectStore('collections');
      console.log('apiData',apiData)
      // for (const item of apiData) {
      //   console.log(item)
      //   objectStore.add(item);
      // }
      objectStore.add(apiData, 'organ_wise')
      console.log('Sync from API to IndexedDB completed');
    } catch (error) {
      console.error('Error syncing data from API to IndexedDB', error);
      throw error;
    }

  }


  private async clearAllItems(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db.transaction('collections', 'readwrite');
      const objectStore = transaction.objectStore('collections');
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
