import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConcursantesDetallePage } from './concursantes-detalle';

@NgModule({
  declarations: [
    ConcursantesDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(ConcursantesDetallePage),
  ],
})
export class ConcursantesDetallePageModule {}
