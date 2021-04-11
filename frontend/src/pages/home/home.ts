import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  titulo = "Inicio";
  texto = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, vitae at? Tempora cum atque consequuntur consectetur eligendi, quo aperiam excepturi dolore! Beatae quidem eaque omnis accusantium aspernatur dicta reiciendis adipisci."



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToLenguaje() {
    console.log("Ir a lenguaje");
    this.navCtrl.setRoot('LenguajesListaPage');
  }

  goToPaises() {
    this.navCtrl.setRoot('PaisesListaPage');
  }

}
