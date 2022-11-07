/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsPageComponent implements OnInit {

  id: string | number;
  restaurant: any;
  items: any[];
  categories: any;

  constructor(
              private route: ActivatedRoute,
              private navCtrl: NavController,
              private apiService: ApiService
             ) { }

  ngOnInit() {
    this.getID();
    this.getData();
  }

  getID(){
    const id = this.route.snapshot.paramMap.get('id');
    if(!id){
      this.navCtrl.back();
      return;
    }
    this.id = id;
  }

  getData(){
    this.restaurant = this.apiService.allRestaurants.find( r => r.id == this.id);
    this.categories = this.apiService.categories;
    this.items = [...this.apiService.allItems].filter(i => i.uid == this.id);
    console.log(this.items);

  }

  getCuisines(cuisine: any){
    return cuisine.join(', ');
  }

}
