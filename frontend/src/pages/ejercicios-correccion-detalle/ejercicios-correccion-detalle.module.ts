import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EjerciciosCorreccionDetallePage } from './ejercicios-correccion-detalle';

@NgModule({
  declarations: [
    EjerciciosCorreccionDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(EjerciciosCorreccionDetallePage),
  ],
})
export class EjerciciosCorreccionDetallePageModule {}
