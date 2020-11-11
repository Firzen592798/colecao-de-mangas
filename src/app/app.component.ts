import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { HomePage } from '../pages/home/home';

declare var admob;

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private admobFree: AdMobFree) {
    platform.ready().then(() => {
      this.runAds();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.overlaysWebView(true);
      statusBar.backgroundColorByName("primary")
      //statusBar.backgroundColorByHexString("#288266");
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  runAds() {
    const admobid = {
      banner: 'ca-app-pub-8275051926630772/6420033576',
      interstitial: 'ca-app-pub-8275051926630772/7364383928',
    }
    admob.banner.config({
      id: admobid.banner,
      isTesting: true,
      autoShow: true,
    })
    admob.banner.prepare()

    admob.interstitial.config({
      id: admobid.interstitial,
      isTesting: true,
      autoShow: false,
    })
    admob.interstitial.prepare()

  }
}

