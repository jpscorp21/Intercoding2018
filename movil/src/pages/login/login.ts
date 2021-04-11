import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { DataService } from '../service/util/data.service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  ngForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataService: DataService,
              public _toast: ToastController,
              private _auth: AuthService) {
    this.initForm();

    localStorage.removeItem('USER_APP_MOVIL');
    this._auth.logout();
  }

  initForm() {
    this.ngForm = new FormGroup({
      usuario: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  login() {

    if (this.ngForm.valid) {

      this._auth.login({
        usuario: this.ngForm.value.usuario,
        password: this.ngForm.value.password
      }).then((data: any) => {
        console.log(data);
          if (data) {
            localStorage.setItem('USER_APP_MOVIL', JSON.stringify(data));
            this.navCtrl.setRoot(HomePage);
          } else {
            this.dataService.error('El usuario no esta registrado en la base de datos');
          }

      }).catch((error) => {
        if (error.statusText === "Unknown Error") this.dataService.error('Problemas en el servidor');
        else this.dataService.error('El usuario no esta registrado en la base de datos');
      });

    }
  }

}
