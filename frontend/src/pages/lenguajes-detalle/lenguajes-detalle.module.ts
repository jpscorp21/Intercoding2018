import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LenguajesDetallePage } from './lenguajes-detalle';

@NgModule({
  declarations: [
    LenguajesDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(LenguajesDetallePage),
  ],
})
export class LenguajesDetallePageModule {}
