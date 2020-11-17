import { Component } from '@angular/core';
import { AdMobFree } from '@ionic-native/admob-free';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjudaPage');
    this.runBanner();
  }

  runBanner() {
    const admobid = {
      banner: 'ca-app-pub-8275051926630772/6420033576',
      interstitial: 'ca-app-pub-8275051926630772/7364383928',
    }
    admob.banner.config({
      id: admobid.banner,
      isTesting: true,
      autoShow: true,
    })
    admob.banner.prepare();
  }

  ionViewDidLeave(){
    admob.banner.hide();
  }

}
