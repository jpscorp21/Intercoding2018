import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EjerciciosListaPage } from './ejercicios-lista';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    EjerciciosListaPage,
  ],
  imports: [
    IonicPageModule.forChild(EjerciciosListaPage),
    PipesModule,
    ComponentsModule
  ],
})
export class EjerciciosListaPageModule {}
