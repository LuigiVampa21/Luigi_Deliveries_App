import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { INTRO_KEY, StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(private router: Router, private storageService: StorageService){ }
  async canLoad(): Promise<boolean | UrlTree> {
    const hasSeenIntro = await this.storageService.getPreference(INTRO_KEY);
    if(hasSeenIntro && hasSeenIntro.value === 'true'){
      return true;
  };
  this.router.navigateByUrl('/intro', { replaceUrl: true });
  return true;
  }
}
