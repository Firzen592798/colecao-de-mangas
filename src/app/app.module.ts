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

@NgModule({
  declarations: [
    MyApp,
    HomePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CapitulosMangaPageModule,
    AdicionarMangaPageModule,
    IonicStorageModule.forRoot(),
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
    DatePipe,
    IonicStorageModule,
  ]
})
export class AppModule {}
