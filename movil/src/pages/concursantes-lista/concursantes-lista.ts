import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConcursantesService } from '../service/concursantes.service';
import { CorreccionesService } from '../service/correcciones.service';



@IonicPage()
@Component({
  selector: 'page-concursantes-lista',
  templateUrl: 'concursantes-lista.html',
})
export class ConcursantesListaPage {

  concursantes : any[] = [];
  categoria : string ="";
  staff: any;

  socket: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public concursantesService: ConcursantesService,
              public correccionesService: CorreccionesService,
              public alert : AlertController ) {

      if (!localStorage.getItem('USER_APP_MOVIL')) {
          this.navCtrl.setRoot('LoginPage');
          return;
      } else {
          this.staff = JSON.parse(localStorage.getItem('USER_APP_MOVIL')).staff;
      }

      this.getCorrecciones();

      this.concursantesService.getConcusantesSocket().subscribe((data: any) => {
        console.log(data);
        this.correccionesService.fetchAll();
      });

  }

  /*ionViewWillEnter() {
    this.getCorrecciones();
  }*/

  getCorrecciones() {
    this.correccionesService.fetchAll();
  }

  atras(){
    this.navCtrl.setRoot('HomePage');
  }

  goToDetalle(concursantes:any){
    this.navCtrl.push('ConcursantesDetallePage',{
     concursantes:concursantes,
     usuario: this.staff.usuario,
    })
  }

  openAlert(concursantes:any){
    let mensaje = this.alert.create({
      title: "Mensaje del Sistema",
      message: "Esta seguro de seleccionar este concursante?",

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
          this.goToDetalle(concursantes);
          }
        }
      ]
    })
    mensaje.present();
  }

}
