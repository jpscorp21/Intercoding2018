import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
//import { RestApiService } from '../services/rest-api.service';

@Injectable()
export class DataService {

  message = 'Ejemplo';
  messageType = 'danger'; // Mensaje por Defecto

  constructor(private toast: ToastService, ){

  }

  // Métodos de Estado
  error(message) {
    this.messageType = 'danger';
    this.message = message;
    this.showMessage();
  }

  success(message) {
    this.messageType = 'success';
    this.message = message;
    this.showMessage();
  }

  warning(message) {
    this.messageType = 'warning';
    this.message = message;
    this.showMessage();
  }

  info(message) {
    this.messageType = 'info';
    this.message = message;
    this.showMessage();
  }

  showMessage() {
    this.toast.create(this.message, 'toast-' + this.messageType);
  }
}
