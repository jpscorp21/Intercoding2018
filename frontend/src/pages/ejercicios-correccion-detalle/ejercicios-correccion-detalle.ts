import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EjerciciosService } from '../../services/ejercicios/ejercicios.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Ejercicios } from '../../models/ejercicios';


@IonicPage()
@Component({
  selector: 'page-ejercicios-correccion-detalle',
  templateUrl: 'ejercicios-correccion-detalle.html',
})
export class EjerciciosCorreccionDetallePage {

  ejercicio: Ejercicios;
  iniciado: boolean = false;
  estado: string = "";
  loadingCorrigiendo: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _DomSanitizer: DomSanitizer,
              public ejerciciosService: EjerciciosService) {

    if (this.navParams.data.ejercicio) {
      this.estado = this.navParams.data.ejercicio.estado;
      this.ejercicio = this.navParams.data.ejercicio;
    }





  }









}
