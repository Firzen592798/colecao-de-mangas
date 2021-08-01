import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { MangaapiProvider } from '../../providers/mangaapi/mangaapi';

/**
 * Generated class for the SincronizacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sincronizacao',
  templateUrl: 'sincronizacao.html',
})
export class SincronizacaoPage {
  email: string = "";
  senha: string = "";
  confirmasenha: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public mangaApi: MangaapiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SincronizacaoPage');
  }

  validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  ativarSincronizacao(){
    if(this.senha == this.confirmasenha){
      if(this.validarEmail(this.email)){
        this.mangaApi.ativarSincronizacao(this.email, Md5.hashStr(this.senha));
        this.presentToast("Sincronização de dados ativada com sucesso");
      }else{
        this.presentToast("E-mail inválido");
      }
    }else{
      this.presentToast("Senhas não se correspondem");
    }
    
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
  
    toast.present();
  }


}
