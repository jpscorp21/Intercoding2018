import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StaffService } from '../../services/staff/staff.service';


@IonicPage()
@Component({
  selector: 'page-modal-formulario',
  templateUrl: 'modal-formulario.html',
})
export class ModalFormularioPage {

  public usuario: string = "";
  public password: string = "";
  public accion: string = "";

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public staff: StaffService,
              public navParams: NavParams) {

    this.accion = this.navParams.data.accion;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalFormularioPage');
  }

  async aceptar() {
    const resultado =  await this.validarJurado();
    if (resultado) {
      if (this.accion == 'consultar') {
        this.viewCtrl.dismiss('DES');
      } else if(this.accion == 'entregar') {
        this.viewCtrl.dismiss('TER');
      }
    }

  }

  async validarJurado() {
    const resultado = await this.staff.validarJurado(this.usuario, this.password);
    return resultado;
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }

}
