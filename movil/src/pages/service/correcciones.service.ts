import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as io from 'socket.io-client';
import { AppConfig } from '../../app/app.config';
@Injectable()
export class CorreccionesService {

    public concursantes : any[] = [];
    private socket: any;
    private socketApp: any;

    constructor(public http: HttpClient, private readonly config: AppConfig) {
      this.socket = io(this.config.url);
    }

    fetchAll() {
      return this.http.get(`${this.config.url}ejercicios/search/estadoscorrecciones`).toPromise()
      .then((data: any) => {
        this.concursantes = data;
      })
      .catch((error) => {
        console.log(error);
      })
    }

    removeById(id) {
      this.concursantes = this.concursantes.filter((value) => value.cod_aleatorio !== id);
    }



}

