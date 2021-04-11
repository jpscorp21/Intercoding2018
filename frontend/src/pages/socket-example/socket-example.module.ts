import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocketExamplePage } from './socket-example';

@NgModule({
  declarations: [
    SocketExamplePage,
  ],
  imports: [
    IonicPageModule.forChild(SocketExamplePage),
  ],
})
export class SocketExamplePageModule {}
