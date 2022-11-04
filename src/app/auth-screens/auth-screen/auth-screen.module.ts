import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthScreenPageRoutingModule } from './auth-screen-routing.module';

import { AuthScreenPage } from './auth-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthScreenPageRoutingModule
  ],
  declarations: [AuthScreenPage]
})
export class AuthScreenPageModule {}
