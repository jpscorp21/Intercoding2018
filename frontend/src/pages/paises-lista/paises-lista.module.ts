import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaisesListaPage } from './paises-lista';

@NgModule({
  declarations: [
    PaisesListaPage,
  ],
  imports: [
    IonicPageModule.forChild(PaisesListaPage),
  ],
})
export class PaisesListaPageModule {}
