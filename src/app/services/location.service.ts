/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private locationAccuracy: LocationAccuracy) { }

  async enableLocation() {
    try {
      const canRequest: boolean = await this.locationAccuracy.canRequest();
      if(canRequest) {
        await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        return true;
      }
      return false;
    } catch(err) {
      console.log(err);
      throw(err);
    }
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return coordinates;
    } catch (err) {
      throw (err);
    }
  }

  async requestLocationPermission() {
    try {
      const status = await Geolocation.requestPermissions();
      return status;
    } catch (err) {
      throw (err);
    }
  }
}
