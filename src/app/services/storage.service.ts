import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export const INTRO_KEY = 'intro-slides';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setPreference(key: string, value: string){
    await Preferences.set({
      key,
      value
    });
  }

  async getPreference(key: string){
    return Preferences.get({ key });
  }

  removePreference(key: string) {
    return Preferences.remove({key});
  }
}
