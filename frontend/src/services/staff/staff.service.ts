import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app/app.config';

@Injectable()
export class StaffService {

  constructor(private http: HttpClient, private config: AppConfig) {}

  validarJurado(usuario, password) {

    return this.http.post(`${this.config.url}staff/validar`, {usuario, password})
    .toPromise().then((data) => data);

  }

}
