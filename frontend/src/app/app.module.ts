import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { FormsModule } from '../../node_modules/@angular/forms';

//SERVICIOS
import { CodigoService } from '../services/codigo/codigo.service';
import { EjerciciosService } from '../services/ejercicios/ejercicios.service';
import { AuthService } from '../services/auth/auth.service';

//INTERCEPTORES
import { TokenInterceptor } from '../services/auth/token.interceptor';
import { JwtInterceptor } from '../services/auth/jwt.interceptor';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaisesService } from '../services/paises/paises.service';
import { StaffService } from '../services/staff/staff.service';
import { AppConfig } from './app.config';
import { ToastService } from '../services/util/toast.service';
import { DataService } from '../services/util/data.service';

@NgModule({
  declarations: [
    MyApp

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    CodigoService,
    EjerciciosService,
    AuthService,
    PaisesService,
    StaffService,
    ToastService,
    DataService,
    AppConfig
  ]
})
export class AppModule {}
