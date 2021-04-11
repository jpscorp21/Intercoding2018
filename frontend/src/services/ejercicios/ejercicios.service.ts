import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from '../../app/app.config';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';
import { DataService } from '../util/data.service';
import { Base64 } from 'js-base64';


@Injectable()
export class EjerciciosService {

  public socket: any;
  private mensajeError: string = 'Error en el servidor';

  constructor(private http: HttpClient, private config: AppConfig, private dataService: DataService) {}

  getAllByDificultad(grado_dificultad, cantidad, cod_categoria, usuario) {

    return this.http.get(`${this.config.url}ejercicios/all/${usuario}/${cod_categoria}/${grado_dificultad}/${cantidad}`)
          .timeout(5000)
          .catch((error) => {
           this.dataService.error(this.mensajeError);
           return[];
          });
  }

  getAllTest(cod_categoria, usuario) {

    return this.http.get(`${this.config.url}ejercicios/alltest/${usuario}/${cod_categoria}`)
          .timeout(5000)
          .catch((error) => {
           this.dataService.error(this.mensajeError);
           return[];
          });
  }

  getAllEjercicio(grado_dificultad, cod_categoria) {
    return this.http.get(`${this.config.url}ejercicios/control/all/${cod_categoria}/${grado_dificultad}`)
          .timeout(5000)
          .catch((error) => {
           this.dataService.error(this.mensajeError);
           return[];
        });
  }

  updateEstado(estado, id) {
    return this.http.put(`${this.config.url}ejercicios/estado`, {estado, id})
          .timeout(5000)
          .catch((error: any) => of(false))
  }

  buscarEstado(usuario, cod_categoria) {
    return this.http.post(`${this.config.url}ejercicios/search/estado`, {usuario, cod_categoria})
          .timeout(5000)
          .catch((error: any) => {
              this.dataService.error(this.mensajeError);
              return of({});
          });
  }

  getEjercicioReanudar(grado_dificultad, cod_categoria, usuario) {

    return this.http.get(`${this.config.url}ejercicios/reanudar/${usuario}/${cod_categoria}/${grado_dificultad}`)
          .timeout(5000)
          .catch((error) => {
            this.dataService.error(this.mensajeError);
            return []
          });
  }

  buscarEjerciciosTerminados(grado_dificultad, cod_categoria, usuario) {
    this.http.post(`${this.config.url}ejercicios/search/estadosterminados`, {usuario, estado: 'TER', cod_categoria, grado_dificultad})
    .subscribe((data) => console.log(data));

  }

  buscarEjerciciosTerminadosCounts(usuario, cod_categoria) {
    return this.http.post(`${this.config.url}ejercicios/search/estadosterminados/counts`, {usuario, cod_categoria})
           .timeout(5000)
           .toPromise();
  }

  entregarEjercicioSocket(cod_aleatorio) {
    this.socket = io(this.config.url);
    this.socket.emit('entrega_concursante', {cod_aleatorio, estado: 'COR'});

  }

  getVerificadoSocket() {
    let observable = new Observable(observer => {
        this.socket.on('verificado', (data) => {
          observer.next(data);
        });
    })
    return observable;
  }

  iniciarSocket() {
    this.socket = io(this.config.url);
  }

}
