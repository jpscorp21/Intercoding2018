import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaisesService {

  constructor(public http: HttpClient) {}

  getAll() {
    return this.http.get('https://restcountries.eu/rest/v2/all')
  }

}
