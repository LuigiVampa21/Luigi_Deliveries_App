/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';


@Injectable({
  providedIn: 'root'
})

export class LocationService {

  geocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
};

  constructor(
    private locationAccuracy: LocationAccuracy,
    private nativeGeocoder: NativeGeocoder,
    ) { }

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

  async forwardGeocoder(adress: string){
    try{
      const result =  await this.nativeGeocoder.forwardGeocode(adress, this.geocoderOptions);
      return result[0];
    }catch(err){
      console.log(err);
      throw(err);
    }
  }

  async reverseGeocoder(lat: number, lng: number){
    try{
      const result =  await this.nativeGeocoder.reverseGeocode(lat, lng, this.geocoderOptions);
      return result[0];
    }catch(err){
      console.log(err);
      throw(err);
    }
  }
}
