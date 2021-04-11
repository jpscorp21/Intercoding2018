import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EjerciciosPopoverPage } from './ejercicios-popover';


@NgModule({
  declarations: [
    EjerciciosPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(EjerciciosPopoverPage),
  ],
})
export class PopoverPageModule {}
