import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public alert : AlertController,
              public toastCtrl : ToastController )
              {
    if (!localStorage.getItem('USER_APP_MOVIL')) {
      this.navCtrl.setRoot('LoginPage');
      return;
    }

  }
  goToConcursantes(){
    console.log("Ir a concursante");
    this.navCtrl.setRoot('ConcursantesListaPage');
  }

  openAlert(){
    let mensaje = this.alert.create({
      title: "Mensaje del Sistema",
      message: "Esta seguro de validar el ejercicio?",

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    })
    mensaje.present();
  }
  toast() {
    let toast = this.toastCtrl.create({
      message: 'te quedaste sin pan',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  openConcursantes(categoria){
    this.navCtrl.push('ConcursantesListaPage',{
      categoria: categoria
    } );


  }



}
