import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EjerciciosCorreccionPage } from './ejercicios-correccion';

@NgModule({
  declarations: [
    EjerciciosCorreccionPage,
  ],
  imports: [
    IonicPageModule.forChild(EjerciciosCorreccionPage),
  ],
})
export class EjerciciosCorreccionPageModule {}
