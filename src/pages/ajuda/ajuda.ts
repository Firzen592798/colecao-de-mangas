import { Component } from '@angular/core';
import { AdMobFree } from '@ionic-native/admob-free';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdsProvider } from '../../providers/ads/ads';
import { SincronizacaoPage } from '../sincronizacao/sincronizacao';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AjudaImagemPage } from '../ajuda-imagem/ajuda-imagem';
/**
 * Generated class for the AjudaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var admob;
@IonicPage()
@Component({
  selector: 'page-ajuda',
  templateUrl: 'ajuda.html',
})

export class AjudaPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public ads: AdsProvider, public iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    this.ads.showBanner();
  }

  ionViewDidLeave(){
    this.ads.hideBanner();
  }

  irParaSincronizacao(){
    this.navCtrl.push(SincronizacaoPage);
  }

  irParaAjudaImagem(){
    this.navCtrl.push(AjudaImagemPage);
  }

  voltar(){
    this.navCtrl.pop();
  }

  abrirLink(){
    const browser = this.iab.create('https://anilist.co/search/manga', "_system");
  }
}
