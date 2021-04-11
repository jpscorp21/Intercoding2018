import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Concursantes } from '../../models/concursantes';
import { HomePage } from '../home/home';
import { ConcursantesService } from '../service/concursantes.service';
import { CorreccionesService } from '../service/correcciones.service';


@IonicPage()
@Component({
  selector: 'page-concursantes-detalle',
  templateUrl: 'concursantes-detalle.html',
})
export class ConcursantesDetallePage {
  concursantes : Concursantes;
  staff: string = "";

  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public concursantesService: ConcursantesService,
            public correccionesService: CorreccionesService,
            public alert : AlertController) {
    this.concursantes = this.navParams.data.concursantes;
    if (!this.concursantes){
      this.navCtrl.setRoot(HomePage);
      return;
    }
    this.staff = this.navParams.data.usuario;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConcursantesDetallePage');
  }

  abrirAlerta(){
    let mensaje = this.alert.create({
      title: "Mensaje del Sistema",
      message: "Esta seguro de corregir el ejercicio?",

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
            this.actualizarEstado('TER');
          }
        }
      ]
    })
    mensaje.present();
  }

  abrirAlertaRechazar(){
    let mensaje = this.alert.create({
      title: "Mensaje del Sistema",
      message: "Esta seguro de rechazar el ejercicio??",

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
            this.actualizarEstado('DES');
          }
        }
      ]
    })
    mensaje.present();
  }

  actualizarEstado(estado: string) {
    this.concursantesService.correctionEjercicioSocket(
      this.concursantes.cod_aleatorio,
      estado,
      this.staff,
      this.concursantes.cod_categoria,
      this.concursantes.grado_dificultad
    );
    this.correccionesService.removeById(this.concursantes.cod_aleatorio);
    this.navCtrl.pop();
  }

}
