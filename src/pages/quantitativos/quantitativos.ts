import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuantitativosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    });
    this.totalVolumesMangaFaltaLer = this.totalVolumesMangaPossuidos - this.totalVolumesMangaLidos;
    console.log(this.lista_mangas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuantitativosPage');
  }

}
