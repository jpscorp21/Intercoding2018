import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EjerciciosDetallePage } from './ejercicios-detalle';

@NgModule({
  declarations: [
    EjerciciosDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(EjerciciosDetallePage),
  ],
})
export class EjerciciosDetallePageModule {}
