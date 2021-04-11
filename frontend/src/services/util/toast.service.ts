import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {

  constructor(public toastCtrl: ToastController) { }

  create(message, style = "") {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      closeButtonText: 'OK',
      cssClass: style
    });
    toast.present();
  }
}
