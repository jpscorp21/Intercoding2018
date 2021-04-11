import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class AppConfig {

  private _server: string = '192.168.1.4';
  private _port: number = 3000;

  constructor() {}

  get server(): string {
    return this._server;
  }

  set server(server: string) {
    this.server = server;
  }

  get port(): number {
    return this._port;
  }

  get url() {
    return `http://${this.server}:${this.port}/`;
  }

}
