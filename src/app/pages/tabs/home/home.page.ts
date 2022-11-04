import { AfterContentChecked, Component, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions, Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {

  loc = 'Locating..';
  banners = [];
  bannerConfig: SwiperOptions;
  constructor() { }

  ngOnInit() {
    this.banners = [
      {banner: 'assets/dishes/11.jpeg'},
      {banner: 'assets/dishes/1.jpg'},
      {banner: 'assets/dishes/cab.jpg'},
    ];
  }

  ngAfterContentChecked(): void {
    this.bannerConfig ={
      slidesPerView:1.2,
      spaceBetween: 50,
      centeredSlides: true,
      initialSlide: 1,
      autoplay: {
        delay: 3000
      }
    };
  }

}
