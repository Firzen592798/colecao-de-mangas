import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdsProvider } from '../../providers/ads/ads';

/**
 * Generated class for the AjudaImagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajuda-imagem',
  templateUrl: 'ajuda-imagem.html',
})
export class AjudaImagemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public ads: AdsProvider,  public iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    this.ads.showBanner();
  }

  ionViewDidLeave(){
    this.ads.hideBanner();
  }

  voltar(){
    this.navCtrl.pop();
  }

  abrirLink(){
    const browser = this.iab.create('https://anilist.co/search/manga', "_system");
  }
}
