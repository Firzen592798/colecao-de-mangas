import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AjudaPage } from '../ajuda/ajuda';

/**
 * Generated class for the QuantitativosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var admob;
@IonicPage()
@Component({
  selector: 'page-quantitativos',
  templateUrl: 'quantitativos.html',
})
export class QuantitativosPage {
  lista_mangas: any = [];
  totalColecoesPossuidas: number;
  totalColecoesCompletas: number;
  totalVolumesMangaPossuidos: number = 0;
  totalVolumesMangaLidos: number = 0;
  totalVolumesMangaFaltaLer: number = 0;
  totalVolumesMangaFaltaComprar: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.lista_mangas = navParams.get("lista_mangas");
    this.totalColecoesPossuidas = this.lista_mangas.length;
    this.totalColecoesCompletas =  this.lista_mangas.reduce((total, mangaItem) => {
      return mangaItem.completo == true ? ++total : total;
    }, 0); 

    this.lista_mangas.forEach(mangaItem => {
      this.totalVolumesMangaPossuidos += mangaItem.lista.reduce((total, volumeItem) => {
        return volumeItem.status != "naocomprado" ? ++total : total;
      }, 0); 

      this.totalVolumesMangaLidos += mangaItem.lista.reduce((total, volumeItem) => {
        return volumeItem.status == "lido" ? ++total : total;
      }, 0); 

      this.totalVolumesMangaFaltaComprar += mangaItem.lista.reduce((total, volumeItem) => {
        return volumeItem.status == "naocomprado" ? ++total : total;
      }, 0); 
    });
    this.totalVolumesMangaFaltaLer = this.totalVolumesMangaPossuidos - this.totalVolumesMangaLidos;
    console.log(this.lista_mangas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuantitativosPage');
    this.runBanner();
  }
  
  mostrarInfo(i){
    var texto = "Número de coleções:";
    switch(i){
      case 0:
        texto = "Número de títulos de mangá dos quais você tem ao menos um mangá" 
        break;
      case 1:
        texto = "Número de títulos de mangá dos quais você tem a coleção completa, ou seja, todos os mangás" 
        break;
      case 2:
        texto = "Número de mangás que você possui na coleção somando-se todos os títulos" 
        break;
      case 3:
        texto = "Número de mangás que você já leu somando-se todos os títulos" 
        break;
      case 4:
        texto = "Número de mangás que você comprou mas ainda não leu somando-se todos os títulos" 
        break;
      case 5:
        texto = "Quantidade de volumes de mangás que deveriam estar na coleção mas você não possui, deixando um buraco na coleção" 
        break;
    }
    this.presentToast(texto);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
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
