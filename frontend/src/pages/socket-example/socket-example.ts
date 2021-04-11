import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as io from 'socket.io-client';

/**
 * Generated class for the SocketExamplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-socket-example',
  templateUrl: 'socket-example.html',
})
export class SocketExamplePage {

  socket: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.socket = io('http://localhost:3000');

  }



}
