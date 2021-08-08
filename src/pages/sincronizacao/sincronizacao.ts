import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { MangaProvider } from '../../providers/manga/manga';
import { MangaapiProvider } from '../../providers/mangaapi/mangaapi';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';

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
  usuario: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public mangaProvider: MangaProvider, public mangaApi: MangaapiProvider) {
  }

  ionViewDidEnter(){
    this.usuario = this.mangaProvider.usuario;
    console.log('ionViewDidEnter SincronizacaoPage');
    console.log(this.usuario);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SincronizacaoPage');
  }

  validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  atualizarDados(){

  }

  irParaCadastro(){
      this.navCtrl.push(CadastroUsuarioPage, {lista_mangas: this.navParams.get("lista_mangas")});
  }

  desativarSincronizacao(){
    console.log("desativar");
    console.log(this.usuario);
    this.mangaApi.desativarSincronizacao(this.usuario.email).subscribe(data => {
      console.log(data);
      this.mangaProvider.removerUsuario();
      this.usuario = null;
      this.presentToast("Sincronização de dados desativada com sucesso");
    }, errorData => {
      this.presentToast("Ocorreu um erro");
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
  
    toast.present();
  }


}
