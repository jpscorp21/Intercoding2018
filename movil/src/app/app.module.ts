import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConcursantesService } from '../pages/service/concursantes.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppConfig } from './app.config';
import { CorreccionesService } from '../pages/service/correcciones.service';
import { AuthService } from '../pages/service/auth/auth.service';
import { DataService } from '../pages/service/util/data.service';
import { ToastService } from '../pages/service/util/toast.service';
import { TokenInterceptor } from '../pages/service/auth/token.interceptor';
import { JwtInterceptor } from '../pages/service/auth/jwt.interceptor';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    ConcursantesService,
    AppConfig,
    CorreccionesService,
    AuthService,
    DataService,
    ToastService
  ]
})
export class AppModule {}
