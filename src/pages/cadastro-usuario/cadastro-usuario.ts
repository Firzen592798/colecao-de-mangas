import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Md5 } from 'ts-md5';
import { MangaProvider } from '../../providers/manga/manga';
import { MangaapiProvider } from '../../providers/mangaapi/mangaapi';

/**
 * Generated class for the CadastroUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

  email: string = "";
  senha: string = "";
  confirmasenha: string = "";
  usuario: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public mangaProvider: MangaProvider, public mangaApi: MangaapiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SincronizacaoPage');
  }

  validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  //Prossegue com o cadastro de um usuário no banco de dados. Caso o usuário já tenha mangás cadastrados, faz a sincronização com o servidor
  cadastrar(){
    if(this.senha == this.confirmasenha){
      if(this.validarEmail(this.email)){
        var listaMangas = this.navParams.get("lista_mangas");
        this.mangaApi.ativarSincronizacao(this.email, Md5.hashStr(this.senha)).subscribe(usuario => {
          this.mangaApi.salvarMangaEmLote(usuario["idUsuario"], listaMangas)
          console.log("Acerto");
          console.log(usuario);
          this.mangaProvider.salvarUsuario(usuario);
          this.presentToast("Cadastro finalizado com sucesso. Os dados dos seus mangás já estão guardados no nosso banco de dados online e serão atualizados a cada mangá adicionado e/ou atualizado");
          this.navCtrl.pop();
          this.navCtrl.pop();
        }, errorData => {
          this.presentToast(errorData.error.mensagem);
        });
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
      duration: 4000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
