import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { Platform } from 'ionic-angular';
import { AppConstants } from '../../app/app.constants';

/*
  Generated class for the AdsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdsProvider {
  isTesting: boolean = this.constants.isTestingAD;
  showAD: boolean = this.constants.showAD;
  bannerId: string = "ca-app-pub-8275051926630772/6420033576";
  intersId: string = "ca-app-pub-8275051926630772/7364383928";
  constructor(private admobFree: AdMobFree, public platform: Platform, public constants: AppConstants) {}

  showBanner() {
    if(this.showAD){
      console.log("chamou banner")
      this.platform
        .ready()
        .then(() => {
          console.log("then")
          const bannerConfig: AdMobFreeBannerConfig = {
            id: this.bannerId,
            isTesting: this.isTesting,
            autoShow: false
          };
          this.admobFree.banner.config(bannerConfig);
          this.admobFree.banner
            .prepare()
            .then(() => {
              console.log("show")
              this.admobFree.banner.show() .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }
  }

  hideBanner() {
    if(this.showAD){
      this.platform
        .ready()
        .then(() => {
          this.admobFree.banner.hide().catch();
        })
        .catch(e => console.log(e));
    }
  }

  loadInterstitial() {
    if(this.showAD){
      this.platform.ready().then(() => {
        const interConfig: AdMobFreeInterstitialConfig = {
          id: this.intersId,
          isTesting: this.isTesting,
          autoShow: false
        };
        this.admobFree.interstitial.config(interConfig);
        this.admobFree.interstitial.prepare();
      });
    }
  }

  showInterstitial() {
    if(this.showAD){
      this.platform.ready().then(() => {
        const interConfig: AdMobFreeInterstitialConfig = {
          id: this.intersId,
          isTesting: this.isTesting,
          autoShow: false
        };
        this.admobFree.interstitial.config(interConfig);
        this.admobFree.interstitial.isReady().then(() => {
          this.admobFree.interstitial.show().catch(e => console.log("show: " + e))
        }).catch(e => console.log("not ready: " + e))
      });
    }
  }

}
