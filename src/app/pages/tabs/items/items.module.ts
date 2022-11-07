import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsPageComponent } from './items.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemRoutingModule } from './items-routing.module';



@NgModule({
  declarations: [
    ItemsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemRoutingModule
  ]
})
export class ItemsModule { }
