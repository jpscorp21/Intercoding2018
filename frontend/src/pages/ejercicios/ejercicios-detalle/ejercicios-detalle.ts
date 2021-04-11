import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, LoadingController } from 'ionic-angular';
import { Ejercicios } from '../../../models/ejercicios';
import { EjerciciosService } from '../../../services/ejercicios/ejercicios.service';
import { StaffService } from '../../../services/staff/staff.service';
import 'rxjs/add/operator/last';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';
import { DataService } from '../../../services/util/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as io from 'socket.io-client';
import { AppConfig } from '../../../app/app.config';
@IonicPage()
@Component({
  selector: 'page-ejercicios-detalle',
  templateUrl: 'ejercicios-detalle.html',
})
export class EjerciciosDetallePage {

  ejercicio: Ejercicios;
  nombre: string = "";
  apellido: string = "";
  cod_categoria: string = "";
  iniciado: boolean = false;
  estado: string = "";
  loadingCorrigiendo: any;
  subscriptor: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private config: AppConfig,
              public _DomSanitizer: DomSanitizer,
              private _popover: PopoverController,
              private _modal: ModalController,
              public staff: StaffService,
              public data: DataService,
              public loading: LoadingController,
              public ejerciciosService: EjerciciosService) {

    this.nombre = this.config.nombre;
    this.apellido = this.config.apellido;
    this.cod_categoria = this.config.cod_categoria;


    this.crearLoading();

    if (this.navParams.data.ejercicio) {
      this.estado = this.navParams.data.ejercicio.estado;
      this.ejercicio = this.navParams.data.ejercicio;
      this.cargarEjercicioEnLocal(this.ejercicio);
    }


    if (!this.navParams.data.ejercicio) {
      this.navCtrl.setRoot('InicioPage');
      return;
    }


    this.ejercicio = this.navParams.data.ejercicio;

    if (this.ejercicio.estado !== 'LEC' && this.ejercicio.estado !== 'NOL') {
      this.iniciado = true;
    }

    // comprobar estados
    if (this.ejercicio.estado === 'NOL') {
      this.ejerciciosService.updateEstado('LEC', this.ejercicio.cod_aleatorio).toPromise()
        .then((data) => {
          this.modificarEstadoLocal('LEC');
          this.iniciado = false;
        })
        .catch((error) => {
          this.data.error('No se pudo leer el ejercicio recargue la pagina - Problemas del Servidor');
        })
    }
    if (this.ejercicio.estado == 'COR') {
      this.ejerciciosService.iniciarSocket();
      this.getVerificadoSocket();
      this.iniciarLoading();
    }



  }

  getVerificadoSocket() {
  // cuando llega la correcion del jurado
    this.subscriptor = this.ejerciciosService.getVerificadoSocket().subscribe((data: any) => {

      if (data.cod_aleatorio === this.ejercicio.cod_aleatorio ) {

        this.detenerLoading();
        this.ejerciciosService.socket.close();
        if (data.estado == "TER") {
          this.navCtrl.setRoot('EjerciciosListaPage');
        } else {
          this.modificarEstadoLocal('DES');
        }
        //if (data.estado == "DES") this.actualizarEstado(data.estado);
      }

    })
  }

  actualizarEstado(estado) {
    this.ejerciciosService.updateEstado(estado, this.ejercicio.cod_aleatorio).toPromise()
    .then((data) => {
      this.modificarEstadoLocal(estado);
    })
    .catch((data) => this.data.error('Problemas en el servidor'));
  }

  actualizarEstadoYSalir(estado) {
    this.ejerciciosService.updateEstado(estado, this.ejercicio.cod_aleatorio).toPromise()
    .then((data) => {
      this.navCtrl.setRoot('EjerciciosListaPage');

    })
    .catch((data) => this.data.error('Problemas en el servidor'));
  }

  reanudarEjercicio() {
    const {grado_dificultad, cod_categoria, usuario} = this.navParams.data.ejercicio;
    this.ejerciciosService.getEjercicioReanudar(grado_dificultad, cod_categoria, usuario).toPromise()
    .then((data: any) => this.ejercicio = data[0]);
  }

  iniciar() {
    this.openModal('Estas seguro que desea iniciar el ejercicio?', 'iniciar' , 'DES');
  }

  reeleccion() {
    this.openModal('Estas seguro que desea elegir otro ejercicio?', 'reeleccion' , 'ING');
  }

  entregar() {
    this.openModal('Estas seguro que desea entregar el ejercicio', 'entregar', 'TER');
  }

  //ABRE EL MENU POPOVER
  openPopover(ev) {
    let popover = this._popover.create('EjerciciosPopoverPage');
    popover.present({
      ev: ev,
    })
    //CUANDO SE CIERRA EL POPOVER
    popover.onDidDismiss((data) => {
      if (data) {

        if (data.texto === 'salir') {
          this.navCtrl.setRoot('InicioPage');
        }

      }
    })
  }

  openModal(mensaje, accion, estado) {
    let modal = this._modal.create('ModalConfirmacionPage',
      { mensaje: mensaje },
      {  cssClass: 'inset-modal' });

    modal.present();

    modal.onWillDismiss((value) => {

      if (!value) return;

      if (accion == 'reeleccion') {
        this.actualizarEstadoYSalir('ING');
      }

      if (accion == 'iniciar') {

        this.ejerciciosService.updateEstado('DES', this.ejercicio.cod_aleatorio).toPromise()
        .then((data) => {
          this.modificarEstadoLocal('DES');
          this.iniciado = true;
        })
        .catch((error) => {
          this.data.error('No se pudo iniciar el ejercicio - Problemas del Servidor');
        })

      }

      if (accion == 'entregar') {
        this.ejerciciosService.updateEstado('COR', this.ejercicio.cod_aleatorio).toPromise()
        .then((data) => {
          this.modificarEstadoLocal('COR');
          this.ejerciciosService.entregarEjercicioSocket(this.ejercicio.cod_aleatorio);
          this.getVerificadoSocket();
          this.iniciarLoading();
        })
        .catch((error) => {
          this.data.error('No se pudo entregar el ejercicio - Problemas del Servidor');
        })
      }

    })
  }

  openModalForm(accion) {
    let modal = this._modal.create('ModalFormularioPage',
      { accion: accion },
      { cssClass: 'inset-modal' });

    modal.present();

    modal.onWillDismiss(data => {
      if (!data) return;

      if (data == 'DES') {
        this.actualizarEstado(data);
      }

      if (data == 'TER') {
        this.actualizarEstadoYSalir('TER');
      }

    })
  }


  crearLoading() {
    this.loadingCorrigiendo = this.loading.create({
      spinner: 'hide',
      content: 'Esperando...'
    });
  }

  iniciarLoading() {
    this.crearLoading();
    this.loadingCorrigiendo.present();
    //setTimeout(() => this.detenerLoading(), 5000);
  }

  detenerLoading() {
    if (this.loadingCorrigiendo){
      this.loadingCorrigiendo.dismiss();
      this.loadingCorrigiendo = null;
    }
  }


  ionViewDidLeave() {
    if (this.subscriptor) {
      this.subscriptor.unsubscribe();
    }
  }

  cargarEjercicioEnLocal(ejercicio: Ejercicios) {
    localStorage.setItem('ejercicio_seleccionado', JSON.stringify(ejercicio));
  }

  modificarEstadoLocal(texto: string) {
    if (!JSON.parse(localStorage.getItem('ejercicio_seleccionado'))) {
      this.cargarEjercicioEnLocal(this.ejercicio);
    }
    let ejercicio = JSON.parse(localStorage.getItem('ejercicio_seleccionado'));
    ejercicio.estado = texto;
    this.cargarEjercicioEnLocal(ejercicio);
  }

  ionViewWillLeave() {
    this.detenerLoading();
  }

}
