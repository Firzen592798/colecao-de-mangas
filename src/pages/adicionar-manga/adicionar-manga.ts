import { MangaProvider } from './../../providers/manga/manga';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the AdicionarMangaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adicionar-manga',
  templateUrl: 'adicionar-manga.html',
})
export class AdicionarMangaPage {

  public manga: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public mangaProvider: MangaProvider, private datepipe: DatePipe, private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarMangaPage');
  }

  adicionar(){
    if(!this.manga.titulo){
      this.presentToast("É necessário preencher um título");
    }else if(this.manga.ultimoComprado > 200){
      this.presentToast("Não é permitido adicionar mais de 200 volumes, porque se existir um mangá maior do que isso, parabens =)");
    }else{
      let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
      this.mangaProvider.salvarManga(key, this.manga);
      this.navCtrl.pop();
      this.presentToast("Mangá adicionado com sucesso");
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
