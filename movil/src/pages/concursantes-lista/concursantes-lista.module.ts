import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConcursantesListaPage } from './concursantes-lista';

@NgModule({
  declarations: [
    ConcursantesListaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConcursantesListaPage),
  ],
})
export class ConcursantesListaPageModule {}
