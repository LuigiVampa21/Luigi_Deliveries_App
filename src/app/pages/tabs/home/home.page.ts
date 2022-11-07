/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable  */
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { PopoverController } from '@ionic/angular';
import SwiperCore, { SwiperOptions, Autoplay, Pagination, EffectCoverflow } from 'swiper';
import { PopoverComponent } from './popover/popover.component';
SwiperCore.use([Autoplay, Pagination, EffectCoverflow]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {

  loc = 'Locating..';
  banners = [];
  bannerConfig: SwiperOptions;
  categoryConfig: SwiperOptions;
  restaurantConfig: SwiperOptions;
  categories = [];
  favorites = [];
  offers = [];
  nearby = [];
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
    this.banners = [
      {banner: 'assets/dishes/11.jpeg'},
      {banner: 'assets/dishes/1.jpg'},
      {banner: 'assets/dishes/cab.jpg'},
    ];
    this.categories = [
      { id: 1, name: 'North Indian', image: 'assets/dishes/nan.jpg' },
      { id: 2, name: 'Italian', image: 'assets/dishes/pasta.jpg' },
      { id: 3, name: 'Chowmein', image: 'assets/dishes/chowmein.jpg' },
      { id: 4, name: 'South Indian', image: 'assets/dishes/dosa.jpg' },
      { id: 5, name: 'Mexican', image: 'assets/dishes/dol.jpg' },
    ];
    this.favorites = [
      {
        id: '1',
        cover: 'assets/dishes/restaurant.jpg',
        name: 'Stayfit',
        cuisines: [
          'Indian',
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100,
        latitude: 0,
        longitude: 0
      },
      {
        id: '2',
        cover: 'assets/dishes/2.jpg',
        name: 'Stayfit1',
        cuisines: [
          'Italian',
          'Mexican',
          'Chinese'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100
      },
      {
        id: '3',
        cover: 'assets/dishes/3.jpg',
        name: 'Kolkata Roll',
        cuisines: [
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100
      },
    ];
    this.offers = [
      {
        id: '1',
        cover: 'assets/dishes/3.jpg',
        name: 'Kolkata Roll',
        cuisines: [
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100
      },
      {
        id: '2',
        cover: 'assets/dishes/2.jpg',
        name: 'Stayfit1',
        cuisines: [
          'Italian',
          'Mexican',
          'Chinese'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100
      },
      {
        id: '3',
        cover: 'assets/dishes/restaurant.jpg',
        name: 'Stayfit',
        cuisines: [
          'Indian',
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100,
        latitude: 0,
        longitude: 0
      },
    ];
    this.nearby = [
      {
        id: '1',
        cover: 'assets/dishes/restaurant.jpg',
        name: 'Stayfit',
        cuisines: [
          'Indian',
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100,
        latitude: 0,
        longitude: 0
      },
      {
        id: '2',
        cover: 'assets/dishes/2.jpg',
        name: 'Stayfit1',
        cuisines: [
          'Italian',
          'Mexican',
          'Chinese'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100
      },
      {
        id: '3',
        cover: 'assets/dishes/3.jpg',
        name: 'Kolkata Roll',
        cuisines: [
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100
      },
    ];
    this.getCurrentLocation();
  }

  ngAfterContentChecked(): void {
    this.bannerConfig ={
      slidesPerView:1.2,
      spaceBetween: 10,
      centeredSlides: true,
      initialSlide: this.banners?.length > 1 ? 1 : 0,
      autoplay: {
        delay: 3000
      },
      pagination:{ clickable: true},
      effect: 'coverflow'
    };
    this.categoryConfig = {
      slidesPerView: 3.5
    };
    this.restaurantConfig = {
      slidesPerView: 1.1
    };
  }

  async getCurrentLocation(){
    try{
  const coordinates = await Geolocation.getCurrentPosition();
  console.log('Current position:', coordinates);
    }catch(err){
      console.log(err);
      this.openPopover();
    }
  }

  openPopover(){
    const ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            left: 5
          }
        }
      }
    }
    this.presentPopover(ev);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'custom-popover',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with data', data);
    if(data) {
      this.requestGeolocationPermission();
    } else {
      this.loc = 'Nice, FR';
    }
  }

  async requestGeolocationPermission(){
    try{
    const status = await Geolocation.requestPermissions();
    if(status.location == 'granted') this.getCurrentLocation();
    else this.loc = 'Nice, FR';
    }catch(err){
      console.log(err);

    }
  }
}
