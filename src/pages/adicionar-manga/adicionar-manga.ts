import { MangaProvider } from './../../providers/manga/manga';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ToastController } from 'ionic-angular';
import { MalapiProvider } from '../../providers/malapi/malapi';
import { AdsProvider } from '../../providers/ads/ads';
import { CapitulosMangaPage } from '../capitulos-manga/capitulos-manga';
import { Camera, CameraOptions } from '@ionic-native/camera';
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

  public image: any;

  public mostrarAd: boolean = true;

  constructor(public navCtrl: NavController, public malProvider: MalapiProvider, public navParams: NavParams, public mangaProvider: MangaProvider, private datepipe: DatePipe, private toastCtrl:ToastController, public ads: AdsProvider, private camera: Camera) {
    var param = navParams.get("manga");
    if(param)
      this.manga = param;
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter(){
    if(this.mostrarAd){
      this.ads.showInterstitial();
    }
  }

  carregarAutocomplete(){
    this.mangaAutocomplete = [{titulo: "Carregando...", imagem: null}];
    if(this.manga.titulo === undefined || this.manga.titulo.length == 0){
      this.mangaAutocomplete = [];
    }else{
      if(this.manga.titulo.length >= 3){
        this.mangaAutocomplete = [{titulo: "Carregando...", imagem: null}];
        this.malProvider.getMangas(this.manga.titulo).then((mangas) => {
          this.mangaAutocomplete = mangas;
        }).catch((error) => {
          this.presentToast(error.message);
          this.mangaAutocomplete = [];
        });
      }else{
        this.presentToast("É necessário digitar no mínimo 3 caracteres");
        this.mangaAutocomplete = [];
      }
    }
  }

  carregarInfo(mangaSelecionado){
    this.malProvider.getAutores(mangaSelecionado.malId).then((autores) => {
      this.manga.autor = autores;
    });
    this.mangaAutocomplete = [];
    this.manga.titulo = mangaSelecionado.titulo;
    this.manga.imagem = mangaSelecionado.imagem;
  }

  salvar(){
    if(!this.manga.titulo){
      this.presentToast("É necessário preencher um título");
    }else if(this.manga.uComprado > 200){
      this.presentToast("Não é permitido adicionar mais de 200 volumes. Se existir um mangá maior do que isso, me avise =)");
    }else{
      this.mostrarAd = false;
      this.mangaProvider.removerInconsistenciasLidosComprados(this.manga);
      if(!this.manga.key){
        let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
        this.mangaProvider.salvarSincronizarManga(key, this.manga);
        this.navCtrl.push(CapitulosMangaPage, {manga: this.manga, novoManga: true});
      }else{
        this.mangaProvider.salvarSincronizarManga(this.manga.key, this.manga);
        this.navCtrl.pop();
        this.presentToast("Mangá salvo com sucesso");
      } 
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {

    });
  
    toast.present();
  }

  fecharAutocomplete(){
    this.mangaAutocomplete = [];
  }

  nextInput(nextInput){
    nextInput.setFocus();
  }

  tirarFoto(){
    const options: CameraOptions = {
      quality: 70,
      targetHeight: 350, 
      targetWidth: 225,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    
    this.camera.getPicture(options).then((imageData) => {
    this.manga.imagem = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      alert(err);
    });
  }
}
