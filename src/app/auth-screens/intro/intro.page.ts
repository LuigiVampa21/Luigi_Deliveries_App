/* eslint-disable */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import SwiperCore, { SwiperOptions, Keyboard, Pagination, EffectCube } from 'swiper';
SwiperCore.use([Keyboard, Pagination, EffectCube]);

export const INTRO_KEY = 'intro-slides';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpts!: SwiperOptions;

  constructor(private router:Router, private storageService: StorageService ) { }

  ngOnInit() {
    this.animation();
  }

  async goToLogin(){
    await this.storageService.setPreference(INTRO_KEY, 'true')
    this.router.navigateByUrl('/auth-screen', { replaceUrl: true })
  }

  animation() {
    this.slideOpts = {
      pagination: { clickable: true },
      keyboard: { enabled: true },
      effect: 'cube'
    };
  }
}
