import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { AppConfig } from '../../../app/app.config';

@Injectable()
export class AuthService {

  private isLogin: boolean = false;

  constructor(private http: HttpClient, private config: AppConfig) {}

  login(obj) {

    return this.http.post(`${this.config.url}staff/login`, obj)
    .timeout(5000)
    .map((data: any) => data.results)
    .do(() => this.isLogin = true)
    .toPromise();

  }

  logout() {
    this.isLogin = false;
  }

  authenticated() {
    return this.isLogin;
  }

}
