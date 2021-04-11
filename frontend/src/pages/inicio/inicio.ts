import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
    if (!JSON.parse(localStorage.getItem('USER_APP'))) {
      this.navCtrl.setRoot('LoginPage');
      return;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  /*ionViewCanEnter() {
    return this.auth.authenticated();
  }*/

}
