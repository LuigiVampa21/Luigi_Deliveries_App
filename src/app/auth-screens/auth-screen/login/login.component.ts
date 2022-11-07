import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  type: boolean;
  isLoading: boolean;

  constructor(private authService: AuthService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]})
    });
  }
  changeType(){
    this.type = !this.type;
  }
  onSubmit() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.login(this.form.value).then((data) => {
      this.router.navigateByUrl('/tabs', {replaceUrl: true});
      this.isLoading = false;
      this.form.reset();
    })
    .catch(err => {
      console.log(err);
      this.isLoading = false;
      let msg = 'Could not sign you in, please try again';
      if(err.code === 'auth/user-not-found') {
        msg = 'Email ID could not be found';
      } else if(err.code === 'auth/wrong-password') {
        msg = 'Incorrect password';
      }
      this.showAlert(msg);
    });
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

