import { Component } from "@angular/core";
import { ViewController, IonicPage, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  template: `
  <ion-list>
    <button ion-item (click)="closeOpcion('salir')">Salir</button>
  </ion-list>
  `
})

export class EjerciciosPopoverPage {



  constructor(public viewCtrl: ViewController, public navParams: NavParams){

  }

  closeOpcion(nombre: string) {
    this.viewCtrl.dismiss({texto: nombre});
  }

}
