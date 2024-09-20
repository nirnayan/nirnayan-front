import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DirectionsService {

  private apiKey: string = 'AIzaSyAeQzuOcT3aIg5Ql2__hJ2bDli20jCA-Bo'; // Replace with your API key
  // private geocodingUrl: string = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.apiKey}&address=`;
  private apiUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json';


  constructor(private http: HttpClient) { }

  async getLatLng(address: string): Promise<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&address=${encodeURIComponent(address)}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
        const result = response.data.results[0];
        return {
          formattedAddress: result.formatted_address,
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng
        };
      } else {
        console.error('Geocoding error:', response.data.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching geocode data:', error);
      throw error;
    }
  }


  getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable<GeolocationPosition>(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => observer.next(position),
          (error) => observer.error(error),
          { enableHighAccuracy: true }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  public getRoute(origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral): Observable<google.maps.DirectionsResult> {
    return new Observable(observer => {
      if (window.google && window.google.maps) {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route({
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            observer.next(result);
            observer.complete();
          } else {
            observer.error('Directions request failed due to ' + status);
          }
        });
      } else {
        observer.error('Google Maps API is not loaded.');
      }
    });
  }

}
