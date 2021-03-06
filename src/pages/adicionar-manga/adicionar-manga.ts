import { MangaProvider } from './../../providers/manga/manga';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ToastController } from 'ionic-angular';
import { MalapiProvider } from '../../providers/malapi/malapi';
import { AdsProvider } from '../../providers/ads/ads';
/**
 * Generated class for the AdicionarMangaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var admob;
@IonicPage()
@Component({
  selector: 'page-adicionar-manga',
  templateUrl: 'adicionar-manga.html',
})
export class AdicionarMangaPage {

  public manga: any = {};

  public mangaAutocomplete: any = [];

  constructor(public navCtrl: NavController, public malProvider: MalapiProvider, public navParams: NavParams, public mangaProvider: MangaProvider, private datepipe: DatePipe, private toastCtrl:ToastController, public ads: AdsProvider) {
    var param = navParams.get("manga");
    if(param)
      this.manga = param;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AdicionarMangaPage');
    /*this.malProvider.getMangas("One Piece").then((mangas) => {
      console.log(mangas);
    });*/
  }

  ionViewDidEnter(){
    this.ads.showInterstitial();
  }

  carregarAutocomplete(){
    //console.log("a");
    this.mangaAutocomplete = [{titulo: "Carregando...", imagem: null}];
    if(this.manga.titulo === undefined || this.manga.titulo.length == 0){
      this.mangaAutocomplete = [];
    }else{
      if(this.manga.titulo.length >= 3){
        this.mangaAutocomplete = [{titulo: "Carregando...", imagem: null}];
        //this.mangaAutocomplete = [{"titulo":"Bleach","imagem":"https://cdn.myanimelist.net/images/manga/2/180089.jpg?s=6370e41455cb4d19c56a475065a69cde"}];
        this.malProvider.getMangas(this.manga.titulo).then((mangas) => {
          this.mangaAutocomplete = mangas;
        }).catch((error) => {
          this.presentToast("Não foi possível obter informações sobre esse mangá. Verifique sua conexão com a internet");
          this.mangaAutocomplete = [];
        });
      }else{
        this.presentToast("É necessário digitar no mínimo 3 caracteres");
      }
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
      this.presentToast("Não é permitido adicionar mais de 200 volumes. Se existir um mangá maior do que isso, parabens =)");
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
      //console.log('Dismissed toast');
    });
  
    toast.present();
  }

  fecharAutocomplete(){
    this.mangaAutocomplete = [];
  }

  nextInput(nextInput){
    nextInput.setFocus();
  }
}
