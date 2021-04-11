import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LenguajesListaPage } from './lenguajes-lista';

@NgModule({
  declarations: [
    LenguajesListaPage,
  ],
  imports: [
    IonicPageModule.forChild(LenguajesListaPage),
  ],
})
export class LenguajesListaPageModule {}
