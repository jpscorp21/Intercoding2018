import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaisesService } from '../../services/paises/paises.service';


@IonicPage()
@Component({
  selector: 'page-paises-lista',
  templateUrl: 'paises-lista.html',
})
export class PaisesListaPage {

  paises: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public paisesService: PaisesService
              ) {

    this.paisesService.getAll().subscribe((data: any) => {
      this.paises = data;
    })
  }

}
