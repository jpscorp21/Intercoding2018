import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Ejercicios } from '../../models/ejercicios';
import { DomSanitizer } from '@angular/platform-browser';
import { EjerciciosService } from '../../services/ejercicios/ejercicios.service';



@IonicPage()
@Component({
  selector: 'page-ejercicios-correccion',
  templateUrl: 'ejercicios-correccion.html',
})
export class EjerciciosCorreccionPage {

  ejercicios: Ejercicios[] = [];
  nombre: string = "";
  apellido: string = "";
  source: string = "";
  counts: number = 0;
  cod_categoria = "2";
  grado_dificultad = "3";

  constructor(public navCtrl: NavController,
              public _DomSanitizer: DomSanitizer,
              public navParams: NavParams,
              private _ejercicios: EjerciciosService,
              private _alert: AlertController) {
  }

  ionViewDidLoad() {
    this.fetchEjercicios(this.grado_dificultad, this.cod_categoria);
  }

  async fetchEjercicios(grado_difiucultad, cod_categoria) {
    await this._ejercicios.getAllEjercicio(grado_difiucultad, cod_categoria)
    .toPromise()
    .then((data: any) => {
        this.ejercicios = data;
    }).catch((error) => {
        this.ejercicios = [];
    })
  }


  alertaCategoria() {

    let alert = this._alert.create({
      title: 'Mensaje del Sistema',
      message: 'Deseas elegir este ejercicio?',
      inputs: [
        {
          type: 'radio',
          label: 'Junior',
          value: '1'
        },
        {
          type: 'radio',
          label: 'Senior',
          value: '2'
        },
      ],
      buttons: [
        {
          text: 'Aceptar',
          handler: data => {
            this.cod_categoria = data;
            this.fetchEjercicios(this.grado_dificultad, this.cod_categoria);
          }
        }
      ]
    })

    alert.present();
  }

  alertaDificultad() {

    let alert = this._alert.create({
      title: 'Mensaje del Sistema',
      message: 'Deseas elegir este ejercicio?',
      inputs: [
        {
          type: 'radio',
          label: 'Alta',
          value: '3'
        },
        {
          type: 'radio',
          label: 'Media',
          value: '2'
        },
        {
          type: 'radio',
          label: 'Baja',
          value: '1'
        },
      ],
      buttons: [
        {
          text: 'Aceptar',
          handler: data => {
            this.grado_dificultad = data;
            this.fetchEjercicios(this.grado_dificultad, this.cod_categoria);
          }
        }
      ]
    })

    alert.present();

  }

}
