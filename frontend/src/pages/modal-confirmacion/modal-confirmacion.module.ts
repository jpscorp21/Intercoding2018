import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalConfirmacionPage } from './modal-confirmacion';

@NgModule({
  declarations: [
    ModalConfirmacionPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalConfirmacionPage),
  ],
})
export class ModalConfirmacionPageModule {}
