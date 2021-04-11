import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class AppConfig {

  private _server: string = '192.168.1.254';
  private _port: number = 3000;
  private _usuario: string = "";
  private _cod_categoria: string = "";
  private _nombre: string = "";
  private _apellido: string = "";
  public datosCargados: boolean = false;

  constructor() {
    this.inicializarDatosConcursante();
  }

  get server(): string {
    return this._server;
  }

  get port(): number {
    return this._port;
  }

  get url() {
    return `http://${this.server}:${this.port}/`;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(nombre: string) {
    if (typeof nombre === 'string') {
      this._nombre = nombre;
    } else {
      this._nombre = '';
    }
  }

  get apellido(): string {
    return this._apellido;
  }

  set apellido(apellido: string) {
    if (typeof apellido === 'string') {
      this._apellido = apellido;
    } else {
      this._apellido = '';
    }

  }

  get usuario(): string {
    return this._usuario;
  }

  set usuario(usuario: string) {
    if (typeof usuario === 'string') {
      this._usuario = usuario;
    } else {
      this._usuario = '';
    }
  }

  get cod_categoria(): string {
    return this._cod_categoria;
  }

  set cod_categoria(cod_categoria: string) {
    if (typeof cod_categoria === 'string') {
      this._cod_categoria = cod_categoria;
    } else {
      this._cod_categoria = '';
    }
  }

  inicializarDatosConcursante(): boolean {
    if (!JSON.parse(localStorage.getItem('USER_APP'))) {
      this.datosCargados = false;
      return false;
    }

    const concursante: any = JSON.parse(localStorage.getItem('USER_APP')).concursante;

    const {cod_categoria, usuario, nombre, apellido} = concursante;
    this.cod_categoria = cod_categoria.toString();
    this.usuario = usuario;
    this.nombre = nombre;
    this.apellido = apellido;

    this.datosCargados = true;
    return true;
  }

}
