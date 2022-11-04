import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setPreference(key, value){
    await Preferences.set({
      key,
      value
    });
  }

  async getPreference(key){
    const ret = await Preferences.get({ key });
    return ret;
  }
}
