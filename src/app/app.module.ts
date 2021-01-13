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
import { Camera } from '@ionic-native/camera';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
//import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';

export const firebaseConfig = {
  apiKey: "AIzaSyAe2MrIL21lFnrYWuF9O5z4gX665CIiXZs",
  authDomain: "colecaodemangas.firebaseapp.com",
  databaseURL: "https://colecaodemangas.firebaseio.com",
  projectId: "colecaodemangas",
  storageBucket: "colecaodemangas.appspot.com",
  messagingSenderId: "117284070821",
  appId: "1:117284070821:web:9c87eaa026b852c47a344c",
  measurementId: "G-9M74SHBZ7Q"
};

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
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
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
    AuthProvider,
    AngularFireAuth,
    AngularFireAuthModule,
    AngularFireDatabase
    //FirebaseAuthentication
  ]
})
export class AppModule {}
