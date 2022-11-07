/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable curly */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  query: string;
  searchBtn: boolean;
  searchBar: boolean;
  isLoading: boolean;

  categories = [
    {id: 1, cover: 'assets/dishes/2.jpg', name: 'Indian'},
    {id: 2, cover: 'assets/dishes/3.jpg', name: 'Italian'},
    {id: 8, cover: 'assets/dishes/10.jpeg', name: 'Rolls'},
    {id: 7, cover: 'assets/dishes/9.jpeg', name: 'Burgers'},
    {id: 3, cover: 'assets/dishes/5.jpeg', name: 'Mexican'},
    {id: 4, cover: 'assets/dishes/6.jpeg', name: 'American'},
    {id: 5, cover: 'assets/dishes/7.jpeg', name: 'Chinese'},
    {id: 6, cover: 'assets/dishes/8.jpeg', name: 'Sea Food'},
  ];

  allRestaurants = [
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

  restaurants = [];

  item = {
    icon: 'search-outline',
    color: 'primary',
    title: 'Sorry!',
    subTitle: ' No results found'
  };

  constructor() { }

  ngOnInit() {
  }


  updateSearch(query: string){
    this.isLoading = true;
    this.query = query;
    this.searchBar = true;
    setTimeout(() => {
      this.restaurants = this.allRestaurants.filter(x => {
      return (x.name).toLowerCase().includes(this.query.toLowerCase())
        || x.cuisines.find(z => z.toLowerCase().includes(this.query.toLowerCase()));
      });
      this.isLoading = false;
    }, 3000);
}
  onInputQuery(){
    if(this.query) this.searchBtn = true;
    else{
      this.searchBtn = false;
    }
  }

  toggleSearch(val?: string){
    if(val){
       this.query = '';
       this.onInputQuery();
      }
    this.searchBar = !this.searchBar;

  }
}
