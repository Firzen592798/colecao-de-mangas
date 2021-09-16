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
    
    //console.log('ionViewDidLoad AdicionarMangaPage');
    /*this.malProvider.getMangas("One Piece").then((mangas) => {
      console.log(mangas);
    });*/
  }

  ionViewDidEnter(){
    if(this.mostrarAd){
      //console.log("Mostrar ad");
      this.ads.showInterstitial();
    }
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
      this.presentToast("Não é permitido adicionar mais de 200 volumes. Se existir um mangá maior do que isso, parabens =)");
    }else{
      this.mostrarAd = false;
      if(!this.manga.key){
        let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
        this.mangaProvider.salvarManga(key, this.manga);
        this.navCtrl.push(CapitulosMangaPage, {manga: this.manga, novoManga: true});
      }else{
        this.mangaProvider.salvarManga(this.manga.key, this.manga);
        this.navCtrl.pop();
        this.presentToast("Mangá salvo com sucesso");
        //this.navCtrl.push(CapitulosMangaPage, {manga: this.manga, novoManga: false});
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

  tirarFoto(){
    const options: CameraOptions = {
      quality: 70,
      targetHeight: 350, 
      targetWidth: 225,
      correctOrientation: true,
      //saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      //destinationType: this.camera.DestinationType.FILE_URI,
      //allowEdit: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    //alert(imageData);
    this.manga.imagem = 'data:image/jpeg;base64,' + imageData;
    //alert(this.image);
    //alert(this.domSanitizer.bypassSecurityTrustUrl(this.image));
    }, (err) => {
      alert(err);
    // Handle error
    });
  }
}
