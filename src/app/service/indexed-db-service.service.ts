import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db: IDBDatabase;
  private dbReadySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  departmentData:any=[];
  
  constructor(private http: HttpClient) {
    this.openDatabase();
  }

  public get dbReady$(): Observable<boolean> {
    return this.dbReadySubject.asObservable();
  }

  private async openDatabase() {
    const request = window.indexedDB.open('Nirnayan-DB', 7);

    request.onupgradeneeded = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;

      // Check and create object stores if they don't exist
      if (!this.db.objectStoreNames.contains('Organ_wise')) {
        this.db.createObjectStore('Organ_wise', { keyPath: 'id', autoIncrement: true });
      }

      if (!this.db.objectStoreNames.contains('condtion_wise')) {
        this.db.createObjectStore('condtion_wise', { keyPath: 'id', autoIncrement: true });
      }

      if (!this.db.objectStoreNames.contains('allTestsList')) {
        this.db.createObjectStore('allTestsList', { keyPath: 'id', autoIncrement: true });
      }
      if (!this.db.objectStoreNames.contains('allPackageList')) {
        this.db.createObjectStore('allPackageList', { keyPath: 'id', autoIncrement: true });
      }

      if (!this.db.objectStoreNames.contains('allDepartment')) {
        this.db.createObjectStore('allDepartment', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      console.log('IndexedDB opened successfully');
      this.dbReadySubject.next(true); // Signal that IndexedDB is ready
    };

    request.onerror = (event) => {
      console.error('Error opening IndexedDB', event);
    };
  }

  public async syncDataFromApi(tableName: string, apiUrl: string): Promise<void> {
    try {
      const apiData = await this.http.get<any[]>(apiUrl).toPromise();

      // Clear existing items in IndexedDB for the specified table
      await this.clearAllItems(tableName);

      // Add new items from API to IndexedDB
      const transaction = this.db.transaction(tableName, 'readwrite');
      const objectStore = transaction.objectStore(tableName);
      for (const item of apiData) {
        objectStore.add(item);
      }

      console.log(`${tableName} sync from API to IndexedDB completed`);
    } catch (error) {
      console.error(`Error syncing data from API to ${tableName} in IndexedDB`, error);
      throw error;
    }
  }

  public async getAllItems(tableName: string): Promise<any[]> {
    await this.waitForDbReady(); // Wait for IndexedDB to be ready
    return new Promise<any[]>((resolve, reject) => {
      const transaction = this.db.transaction(tableName, 'readonly');
      const objectStore = transaction.objectStore(tableName);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  public async getTestById(tableName: string, id: number): Promise<any | undefined> {
    await this.waitForDbReady(); // Wait for IndexedDB to be ready
    return new Promise<any | undefined>((resolve, reject) => {
      const transaction = this.db.transaction(tableName, 'readonly');
      const objectStore = transaction.objectStore(tableName);
      const request = objectStore.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  public async getPackageById(tableName: string, id: number): Promise<any | undefined> {
    await this.waitForDbReady(); // Wait for IndexedDB to be ready
    return new Promise<any | undefined>((resolve, reject) => {
      const transaction = this.db.transaction(tableName, 'readonly');
      const objectStore = transaction.objectStore(tableName);
      const request = objectStore.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }



  private async clearAllItems(tableName: string): Promise<void> {
    await this.waitForDbReady(); // Wait for IndexedDB to be ready
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db.transaction(tableName, 'readwrite');
      const objectStore = transaction.objectStore(tableName);
      const request = objectStore.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  private async waitForDbReady(): Promise<void> {
    if (this.db) {
      return Promise.resolve();
    } else {
      return new Promise<void>((resolve) => {
        const subscription = this.dbReady$.subscribe((ready) => {
          if (ready) {
            subscription.unsubscribe();
            resolve();
          }
        });
      });
    }
  }
}
