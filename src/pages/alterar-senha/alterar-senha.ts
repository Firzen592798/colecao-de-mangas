import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Md5 } from 'ts-md5';
import { AppConstants } from '../../app/app.constants';
import { MangaProvider } from '../../providers/manga/manga';
import { MangaapiProvider } from '../../providers/mangaapi/mangaapi';

/**
 * Generated class for the AlterarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alterar-senha',
  templateUrl: 'alterar-senha.html',
})
export class AlterarSenhaPage {

  senhaatual: string = "";
  senha: string = "";
  confirmasenha: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public mangaProvider: MangaProvider, public mangaApi: MangaapiProvider, public appConstants: AppConstants) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterarSenhaPage');
  }

  submit(){
    if(this.senha == this.confirmasenha){
      if(this.senha.length >= 3){
        let cryptoNova: String = Md5.hashStr(this.senha);
        let cryptoAtual: String = Md5.hashStr(this.senhaatual);
        this.mangaApi.alterarSenha(this.mangaProvider.usuario.idUsuario, cryptoAtual, cryptoNova).then(result => {
          this.presentToast("Senha alterada com sucesso");
          this.navCtrl.pop();
        }).catch(error => {
          this.presentToast(error.message);
        });
      }else{
        this.presentToast("A senha precisa ter no mínimo "+this.appConstants.tamanhoSenha+" caracteres");
      }
    }else{
      this.presentToast("Senhas não se correspondem");
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {

    });
  
    toast.present();
  }
}
