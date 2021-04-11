import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CodigoService {

  readonly CLIENT_SECRET = '90d1b55c321c83a90c18682974454eddcf953853';

  constructor(private http: HttpClient) {}

  verificarCodigo(source: string) {

    this.http.post('https://api.hackerearth.com/v3/code/run/', {
      'client_secret': this.CLIENT_SECRET,
      'async': 0,
      'source': source,
      'lang': "JAVASCRIPT",
      'time_limit': 5,
      'memory_limit': 262144,
    }).subscribe((data) => {
      console.log(data);
    })

  }

}
