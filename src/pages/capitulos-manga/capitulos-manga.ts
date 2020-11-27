import { Component, ViewChild } from '@angular/core';
import { IonicPage,  Navbar, NavController, NavParams, ToastController } from 'ionic-angular';
import { MangaProvider } from '../../providers/manga/manga';

/**
 * Generated class for the CapitulosMangaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-capitulos-manga',
  templateUrl: 'capitulos-manga.html',
})
export class CapitulosMangaPage {
  @ViewChild(Navbar) nav: Navbar;

  manga :any = {};
  isNovoManga: boolean;
  classeAdd = "add";
  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: MangaProvider, public toastCtrl: ToastController) {
    this.manga = navParams.get("manga");
    this.isNovoManga = navParams.get("novoManga");
  }

  ionViewDidLoad() {
    this.nav.backButtonClick = () => {
      this.finalizar();
    }
  }

  finalizar(){
    this.presentToast("Mangá salvo com sucesso");
    this.navCtrl.pop()
    if(this.isNovoManga){
      this.navCtrl.pop()
    }
  }

  adicionarVolume(){
    let novoVolume = {numero: this.manga.lista.length + 1, status: "comprado"}
    this.manga.ultimoComprado = novoVolume.numero;
    this.manga.lista.push(novoVolume);
    this.provider.atualizarManga(this.manga.key, this.manga);
  }

  removerVolume(){
    if(this.manga.lista.length > 0){
      if(this.manga.ultimoComprado == this.manga.lista.length)
        this.manga.ultimoComprado--;
      if(this.manga.ultimoLido == this.manga.lista.length)
        this.manga.ultimoLido--;
      this.manga.lista.pop();
      this.provider.atualizarManga(this.manga.key, this.manga);
    }
  }

  alterarStatus(volume){
    switch(volume.status){
      case "comprado":
        volume.status = "lido"
        if(volume.numero > this.manga.ultimoLido){
          this.manga.ultimoLido = volume.numero;
        }
        this.presentToast("Status do volume alterado para \"Lido\"")
        break;
      case "lido":
      this.presentToast("Status do volume alterado para \"Não possui\"")
        volume.status = "naocomprado"
        var novoUltimoLido = 0, novoUltimoComprado = 0;
        for(let volumeIt of this.manga.lista){
          if(volumeIt.status == "comprado" || volumeIt.status == "lido" && volumeIt.numero > novoUltimoComprado)
            novoUltimoComprado = volumeIt.numero;
          if(volumeIt.status == "lido" && volumeIt.numero > novoUltimoLido)
            novoUltimoLido = volumeIt.numero;
        }
        this.manga.ultimoComprado = novoUltimoComprado;
        this.manga.ultimoLido = novoUltimoLido;
        
        break;
      case "naocomprado":
      this.presentToast("Status do volume alterado para \"Comprado\"")
        if(volume.numero > this.manga.ultimoComprado){
          this.manga.ultimoComprado = volume.numero;
        }
        volume.status = "comprado"
        break;
    }
    
    this.provider.atualizarManga(this.manga.key, this.manga);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      //('Dismissed toast');
    });
  
    toast.present();
  }
}
