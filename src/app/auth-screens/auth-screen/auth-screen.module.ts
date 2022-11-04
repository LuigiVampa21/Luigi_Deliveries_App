import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthScreenPageRoutingModule } from './auth-screen-routing.module';
import { AuthScreenPage } from './auth-screen.page';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthScreenPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AuthScreenPage,
    LoginComponent,
    SignupComponent,
  ]
})
export class AuthScreenPageModule {}
