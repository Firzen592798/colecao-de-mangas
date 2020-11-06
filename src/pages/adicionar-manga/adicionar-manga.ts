import { MangaProvider } from './../../providers/manga/manga';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ToastController } from 'ionic-angular';
import { MalapiProvider } from '../../providers/malapi/malapi';
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

  public mangaAutocomplete: any = [];

  constructor(public navCtrl: NavController, public malProvider: MalapiProvider, public navParams: NavParams, public mangaProvider: MangaProvider, private datepipe: DatePipe, private toastCtrl:ToastController) {
    var param = navParams.get("manga");
    if(param)
      this.manga = param;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarMangaPage');
    /*this.malProvider.getMangas("One Piece").then((mangas) => {
      console.log(mangas);
    });*/
  }

  carregarAutocomplete(){
    
    if(this.manga.titulo.lenght == 0){
      this.mangaAutocomplete = [];
    }
    if(this.manga.titulo.length >= 3){
      this.mangaAutocomplete = [{titulo: "Carregando...", imagem: null}];
      this.malProvider.getMangas(this.manga.titulo).then((mangas) => {
        this.mangaAutocomplete = mangas;
      });
    }
  }

  carregarInfo(mangaSelecionado){
    this.mangaAutocomplete = [];
    this.manga.titulo = mangaSelecionado.titulo;
    this.manga.imagem = mangaSelecionado.imagem;
  }

  salvar(){
    if(!this.manga.titulo){
      this.presentToast("É necessário preencher um título");
    }else if(this.manga.ultimoComprado > 200){
      this.presentToast("Não é permitido adicionar mais de 200 volumes, porque se existir um mangá maior do que isso, parabens =)");
    }else{
      if(!this.manga.key){
        let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
        this.mangaProvider.salvarManga(key, this.manga);
      }else{
        this.mangaProvider.salvarManga(this.manga.key, this.manga);
      } 
      this.navCtrl.pop();
      this.presentToast("Mangá salvo com sucesso");
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
