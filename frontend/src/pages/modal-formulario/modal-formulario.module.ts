import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalFormularioPage } from './modal-formulario';

@NgModule({
  declarations: [
    ModalFormularioPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalFormularioPage),
  ],
})
export class ModalFormularioPageModule {}
