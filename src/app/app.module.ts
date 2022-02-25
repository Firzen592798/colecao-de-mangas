import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
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
import { SincronizacaoPageModule } from '../pages/sincronizacao/sincronizacao.module';
import { AdsProvider } from '../providers/ads/ads';
import { Navbar } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { MangaapiProvider } from '../providers/mangaapi/mangaapi';
import { CadastroUsuarioPageModule } from '../pages/cadastro-usuario/cadastro-usuario.module';
import { AppConstants } from './app.constants';
import { IonicImageLoader } from 'ionic-image-loader';
import { AlterarSenhaPageModule } from '../pages/alterar-senha/alterar-senha.module';
import { RedefinirSenhaPageModule } from '../pages/redefinir-senha/redefinir-senha.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AjudaImagemPageModule } from '../pages/ajuda-imagem/ajuda-imagem.module';

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
    AjudaImagemPageModule,
    QuantitativosPageModule,
    SincronizacaoPageModule,
    CadastroUsuarioPageModule,
    AdicionarMangaPageModule,
    AlterarSenhaPageModule,
    RedefinirSenhaPageModule,
    IonicStorageModule.forRoot(),
    IonicImageLoader.forRoot(),
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
    Network,
    MangaapiProvider,
    AppConstants,
    InAppBrowser
  ]
})
export class AppModule {}
