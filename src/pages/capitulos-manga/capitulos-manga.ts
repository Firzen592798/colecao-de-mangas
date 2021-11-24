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
    this.navCtrl.pop()
    if(this.isNovoManga){
      this.presentToast("Mangá salvo com sucesso");
      this.navCtrl.pop()
    }else{
      this.provider.salvarManga(this.manga.key, this.manga);
    }
  }

  adicionarVolume(){
    let novoVolume = {st: "c"}
    this.manga.uComprado =this.manga.lista.length + 1;
    this.manga.lista.push(novoVolume);
    this.provider.atualizarVolumeManga(this.manga.key, this.manga);
  }

  removerVolume(){
    if(this.manga.lista.length > 0){
      if(this.manga.uComprado == this.manga.lista.length)
        this.manga.uComprado--;
      if(this.manga.uLido == this.manga.lista.length)
        this.manga.uLido--;
      this.manga.lista.pop();
      this.provider.atualizarVolumeManga(this.manga.key, this.manga);
    }
  }

  alterarStatus(volume, numero){
    switch(volume.st){
      case "c":
        volume.st = "l";
        if(numero > this.manga.uLido){
          this.manga.uLido = numero;
        }
        this.presentToast("Status do volume alterado para \"Lido\"")
        break;
      case "l":
        this.presentToast("Status do volume alterado para \"Não possui\"")
        volume.st = "nc";
        var novoUltimoLido = 0, novoUltimoComprado = 0;
        for(let i = 0; i < this.manga.lista.length; i++){
          var volumeIt = this.manga.lista[i];
          var volumeItNumero = i+1;
          if(volumeIt.st == "c" || volumeIt.st == "l" && volumeItNumero > novoUltimoComprado)
            novoUltimoComprado = volumeItNumero;
          if(volumeIt.st == "l" && volumeItNumero > novoUltimoLido)
            novoUltimoLido = volumeItNumero;
        }
        this.manga.uComprado = novoUltimoComprado;
        this.manga.uLido = novoUltimoLido;
        
        break;
      case "nc":
        this.presentToast("Status do volume alterado para \"Comprado\"")
        if(numero > this.manga.uComprado){
          this.manga.uComprado = numero;
        }
        volume.st = "c"
        break;
    }
    
    this.provider.atualizarVolumeManga(this.manga.key, this.manga);
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
