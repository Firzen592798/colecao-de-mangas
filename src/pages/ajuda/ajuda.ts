import { Component } from '@angular/core';
import { AdMobFree } from '@ionic-native/admob-free';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdsProvider } from '../../providers/ads/ads';
import { SincronizacaoPage } from '../sincronizacao/sincronizacao';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public ads: AdsProvider) {
  }

  ionViewDidLoad() {
    this.ads.showBanner();
    //console.log('ionViewDidLoad AjudaPage');
  }

  ionViewDidLeave(){
    this.ads.hideBanner();
  }

  irParaSincronizacao(){
    this.navCtrl.push(SincronizacaoPage);
  }

  voltar(){
    this.navCtrl.pop();
  }

}
