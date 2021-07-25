import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MangaProvider } from '../providers/manga/manga';
import { CapitulosMangaPageModule } from '../pages/capitulos-manga/capitulos-manga.module';
import { AdicionarMangaPageModule } from '../pages/adicionar-manga/adicionar-manga.module';
import { DatePipe } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { MalapiProvider } from '../providers/malapi/malapi';
import { AdMobFree } from '@ionic-native/admob-free';
import { AjudaPageModule } from '../pages/ajuda/ajuda.module';
import { QuantitativosPageModule } from '../pages/quantitativos/quantitativos.module';
import { AdsProvider } from '../providers/ads/ads';
import { Navbar } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {_forceStatusbarPadding: true}),
    CapitulosMangaPageModule,
    AjudaPageModule,
    QuantitativosPageModule,
    AdicionarMangaPageModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MangaProvider,
    MalapiProvider,
    DatePipe,
    IonicStorageModule,
    AdMobFree,
    AdsProvider,
    Camera,
    EmailComposer
  ]
})
export class AppModule {}
