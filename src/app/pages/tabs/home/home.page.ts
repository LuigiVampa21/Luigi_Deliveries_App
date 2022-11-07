/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable  */
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import { ApiService } from 'src/app/services/api.service';

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
  constructor(
    public popoverController: PopoverController,
    private locationService: LocationService,
    private apiService: ApiService
    ) { }
 
  ngOnInit() {
    this.banners = [
      {banner: 'assets/dishes/11.jpeg'},
      {banner: 'assets/dishes/3.jpg'},
      {banner: 'assets/dishes/cab.jpg'},
    ];
    this.categories = this.apiService.categories;
    this.favorites = this.apiService.allRestaurants;
    const offers = [...this.apiService.allRestaurants];
    this.offers = offers.sort((a,b) => parseInt(b.id) - parseInt(a.id));
    this.nearby = this.apiService.allRestaurants;
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
  const coordinates = await this.locationService.getCurrentLocation();
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
      translucent: false
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if(data) {
      this.enableLocation();
    } else {
      this.loc = 'Nice, FR';
    }
  }

  async enableLocation() {
    try {
      const status = await this.locationService.requestLocationPermission();
      console.log(status);
      if(status?.location == 'granted') {
        const stat = await this.locationService.enableLocation();
        if(stat) {
          const coordinates = await this.locationService.getCurrentLocation();
          console.log(coordinates);
          this.getAddress(coordinates);
        }
      }
    } catch(e) {
      console.log(e);
    }
  }

  async requestGeolocationPermission(){
    try{
    const status = await this.locationService.requestLocationPermission();
    if(status.location == 'granted') this.getCurrentLocation();
    else this.loc = 'Nice, FR';
    }catch(err){
      console.log(err);
    }
  }

  async getAddress(coordinates: any){
    try{
      const address = await this.locationService.reverseGeocoder(coordinates.coords.lat, coordinates.coords.lng);
      this.loc =
        (address?.areasOfInterest[0] ? address?.areasOfInterest[0] + ', ' : '') +
        (address?.subLocality ? address?.subLocality + ', ' : '') +
        (' - ' + address?.postalCode + ', ') +
        (address?.locality + ', ') +
        (address?.administrativeArea ? address?.administrativeArea + ', ' : '') +
        (address?.countryName);

    const coords = await this.locationService.forwardGeocoder(this.loc);
  }catch(err){
    console.log(err);
    throw(err);
  }
  }
}
