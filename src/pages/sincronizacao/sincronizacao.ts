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
  usuario: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public mangaProvider: MangaProvider, public mangaApi: MangaapiProvider) {
  }

  ionViewDidEnter(){
    this.usuario = this.mangaProvider.usuario;
    console.log(this.usuario);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SincronizacaoPage');
  }

  validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  irParaCadastro(){
      this.navCtrl.push(CadastroUsuarioPage, {lista_mangas: this.navParams.get("lista_mangas")});
  }

  desativarSincronizacao(){
    console.log(this.usuario);
    this.mangaProvider.removerUsuario();
    this.usuario = null;
    this.presentToast("Sincronização de dados desativada com sucesso");
  }

  entrar(){
    var that = this;
    this.mangaApi.login(this.email, Md5.hashStr(this.senha)).then(function(data){
      that.usuario = data;
      that.mangaProvider.salvarUsuario(data);
      that.mangaApi.listarMangasPorUsuario(data.idUsuario).subscribe(data => {
        var array = data as Array<any>;
        
        for(let manga of array){
          console.log(manga);
          that.mangaProvider.salvarManga(manga["key"], manga);
        } 
        that.presentToast("Seus mangás foram sincronizados");
        that.navCtrl.pop();
      }, errorData => {
        console.log(errorData);
        that.presentToast("Erro");
      });
    }).catch(error => {
      this.presentToast(error.message);
    });    
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
    console.log(toast);
  
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
  
    toast.present();
  }

  recuperarSenha(){
    this.presentToast("Por favor entre em contato com o desenvolvedor através do e-mail firzen592798@gmail.com");
  }
}
