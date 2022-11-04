import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-screen',
  templateUrl: './auth-screen.page.html',
  styleUrls: ['./auth-screen.page.scss'],
})
export class AuthScreenPage implements OnInit {

  form: FormGroup;
  segment: string;
  constructor() { }

  ngOnInit() {
  }

  segmentChanged(e: any){
    this.segment = e.target.value;
  }

}
