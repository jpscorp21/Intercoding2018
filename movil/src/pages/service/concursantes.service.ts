import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../app/app.config';
import { Concursantes } from '../../models/concursantes';
@Injectable()
export class ConcursantesService {
    private concursantes : Concursantes[];
    private socket: any;s

    constructor(public http: HttpClient, private readonly config: AppConfig) {
      this.socket = io(this.config.url);
    }

    getAllMock(){
       return this.concursantes
    }



    getConcusantesSocket() {

      let observable = new Observable(observer => {
        this.socket.on('add_concursante', (data) => {
          observer.next(data);
        });
      })
      return observable;

    }

    correctionEjercicioSocket(cod_aleatorio, estado, usuario, cod_categoria, grado_dificultad) {
      this.socket.emit('correccion', {cod_aleatorio, estado, usuario, cod_categoria, grado_dificultad});
    }

}

