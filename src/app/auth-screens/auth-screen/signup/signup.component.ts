import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  form: FormGroup;
isLoading: boolean;
type: boolean;

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.form = new FormGroup({
      username: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]})
    });
  }

  changeType(){
    this.type = !this.type;
  }
  onSubmit(){
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading= true;
    this.authService.register(this.form.value)
            .then(() => {
              this.router.navigateByUrl('/tabs', {replaceUrl: true});
              this.isLoading = false;
              this.form.reset();
            })
            .catch(err => {
              console.log(err);
              this.isLoading = false;
              let msg = 'Could not sign you up, please try again!';
              if(err.code === 'auth/email-already-in-use') {
                msg = 'Email is already in use, try signup with some other email id';
              }
              this.showAlert(msg);
            }
    );
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Authentication Failed',
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}


