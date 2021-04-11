import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  PopoverController,
  ModalController,
  Item
} from "ionic-angular";
import { Ejercicios } from "../../../models/ejercicios";
import { EjerciciosService } from "../../../services/ejercicios/ejercicios.service";
import { DomSanitizer } from "@angular/platform-browser";
import { AppConfig } from "../../../app/app.config";
import { DataService } from "../../../services/util/data.service";

@IonicPage()
@Component({
  selector: "page-ejercicios-lista",
  templateUrl: "ejercicios-lista.html"
})
export class EjerciciosListaPage {
  ejercicios: Ejercicios[] = [];
  nombre: string = "";
  apellido: string = "";
  cod_categoria: string = "";
  usuario: string = "";
  source: string = "";
  counts: number = 0;

  constructor(
    public navCtrl: NavController,
    public _DomSanitizer: DomSanitizer,
    public navParams: NavParams,
    public data: DataService,
    private _ejercicios: EjerciciosService,
    private _alert: AlertController,
    private _modal: ModalController,
    private config: AppConfig,
    private _popover: PopoverController
  ) {
    this.iniciarEjercicios();
  }

  ionViewDidLoad() {}

  async fetchEjerciciosByDificultad(
    grado_difiucultad,
    cantidad,
    cod_categoria,
    usuario
  ) {
    await this._ejercicios
      .getAllByDificultad(grado_difiucultad, cantidad, cod_categoria, usuario)
      .toPromise()
      .then((data: any) => {
        if (data) {
          data.forEach(item => {
            this.ejercicios.push(item);
          });
        }
      });
  }

  alerta(eje: Ejercicios) {
    let alert = this._alert.create({
      title: "Mensaje del Sistema",
      message: "Deseas elegir este ejercicio?",
      buttons: [
        {
          text: "Cancelar",
          handler: data => {}
        },
        {
          text: "Aceptar",
          handler: data => {
            this.navCtrl.push("EjerciciosDetallePage", { ejercicio: eje });
          }
        }
      ]
    });

    alert.present();
  }

  //ABRE EL MENU POPOVER
  openPopover(ev) {
    let popover = this._popover.create("EjerciciosPopoverPage");
    popover.present({
      ev: ev
    });
    //CUANDO SE CIERRA EL POPOVER
    popover.onDidDismiss(data => {
      if (data) {
        if (data.texto === "salir") {
          this.navCtrl.setRoot("InicioPage");
        }
      }
    });
  }

  botonVerEjercicio(eje: Ejercicios) {
    this.openModal("Estas seguro de ver este ejercicio?", eje);
  }

  openModal(mensaje, eje?: Ejercicios) {
    let modal = this._modal.create(
      "ModalConfirmacionPage",
      { mensaje: mensaje },
      { cssClass: "inset-modal" }
    );

    modal.present();

    modal.onWillDismiss(value => {
      if (!value) return;
      this.navCtrl.setRoot("EjerciciosDetallePage", { ejercicio: eje });
    });
  }

  async iniciarEjercicios() {
    if (!this.config.inicializarDatosConcursante()) {
      this.navCtrl.setRoot("LoginPage");
      return;
    }

    this.nombre = this.config.nombre;
    this.apellido = this.config.apellido;
    this.cod_categoria = this.config.cod_categoria;
    this.usuario = this.config.usuario;

    this.countsEjercicios(this.config.usuario, this.config.cod_categoria);
    this._ejercicios
      .buscarEstado(this.config.usuario, this.config.cod_categoria)
      .toPromise()
      .then(async (data: any) => {
        if (data.length != 0) {
          this.navCtrl.setRoot("EjerciciosDetallePage", { ejercicio: data[0] });
        } else {
          await this.fetchEjerciciosByDificultad("3", "2", this.config.cod_categoria, this.config.usuario);
          await this.fetchEjerciciosByDificultad("2", "3", this.config.cod_categoria, this.config.usuario);
          await this.fetchEjerciciosByDificultad("1", "5", this.config.cod_categoria, this.config.usuario);
        }
      })
      .catch(error => {
        console.log(error);
        this.data.error("Problemas en el servidor");
      });
  }

  countsEjercicios(usuario, cod_categoria) {
    this._ejercicios
      .buscarEjerciciosTerminadosCounts(usuario, cod_categoria)
      .then((data: any) => {
        this.counts = data[0].count;
      })
      .catch((error: any) => (this.counts = 0));
  }
}
