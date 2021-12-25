
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController, AlertController, ToastController, Checkbox, TextInput, FabContainer } from 'ionic-angular';
import { AdicionarMangaPage } from '../adicionar-manga/adicionar-manga';
import { QuantitativosPage } from '../quantitativos/quantitativos';
import { MangaProvider } from '../../providers/manga/manga';
import { CapitulosMangaPage } from '../capitulos-manga/capitulos-manga';
import { MalapiProvider } from '../../providers/malapi/malapi';
import { AjudaPage } from '../ajuda/ajuda';
import { AdMobFree } from '@ionic-native/admob-free';
import { AdsProvider } from '../../providers/ads/ads';
import { SincronizacaoPage } from '../sincronizacao/sincronizacao';
import { MangaapiProvider } from '../../providers/mangaapi/mangaapi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';

declare var admob;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public lista_mangas: any;
  public lista_mangas_filtrado: any;
  public query: String;
  public apenasNaoCompletos: boolean = false;
  public isSearching: boolean = false;

  @ViewChild('search') search:TextInput;

  constructor(public http: HttpClient,public navCtrl: NavController, public malProvider: MalapiProvider, public mangaProvider: MangaProvider, public mangaApi: MangaapiProvider, public alertCtrl: AlertController, public toastCtrl: ToastController, public ads: AdsProvider, public statusBar: StatusBar) {
  }

  ionViewDidEnter(){
    this.ads.loadInterstitial();
    this.mangaProvider.listar().then(data => {
      this.lista_mangas = data;
      this.mangaProvider.sincronizarMangas(this.lista_mangas);
      this.lista_mangas_filtrado = data;
    }).catch(err => {
      this.lista_mangas = [];
      this.lista_mangas_filtrado = [];
    });
  }

  irParaAdicionarManga(fab: FabContainer){
    if(fab)
      fab.close();
    this.navCtrl.push(AdicionarMangaPage);
  }

  irParaEditarManga(manga){
    this.navCtrl.push(AdicionarMangaPage, {manga: manga})
  }

  irParaQuantitativos(fab: FabContainer){
    if(fab)
      fab.close();
    this.navCtrl.push(QuantitativosPage, {lista_mangas: this.lista_mangas})
  }

  irParaCapitulos(manga){
    this.navCtrl.push(CapitulosMangaPage, {manga: manga,novoManga: false});
  }

  irParaSincronizar(){
    this.navCtrl.push(SincronizacaoPage, {lista_mangas: this.lista_mangas});
  }

  irParaAjuda(){
    this.navCtrl.push(AjudaPage)
  }
  
  apagarManga(manga) {
    let alert = this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Deseja excluir esse mangá?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.mangaProvider.excluirManga(manga.key).then(data => {
              console.log(data);
            });
            var index = this.lista_mangas_filtrado.indexOf(manga);
            if (index !== -1) {
              this.lista_mangas_filtrado.splice(index, 1);
            }
            index = this.lista_mangas.indexOf(manga);
            if (index !== -1) {
              this.lista_mangas.splice(index, 1);
            }
            /*this.mangaProvider.listar().then(data => {
              this.lista_mangas = data;
              console.log(data);
            });*/
            this.presentToast("Mangá excluído com sucesso");
          }
        }
      ]
    });
    alert.present();
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


  toggleFiltro(){
    this.apenasNaoCompletos = !this.apenasNaoCompletos;
  }

  //Alterna o status de um mangá para completo ou incompleto(toggle)
  toggleCompleto(manga){
    manga.completo = !manga.completo;
    this.mangaProvider.salvarManga(manga.key, manga);
    if(manga.completo)
      this.presentToast("Mangá marcado como completo");
    else
      this.presentToast("Mangá marcado como não completo");
  }
  
  //Exibe um alert com a opção pra filtrar todos os manás ou apenas os completos
  mostrarFiltro(){
    let alert = this.alertCtrl.create({
      title: 'Modo de exibição',
      inputs: [
        {
          type: 'radio',
          label: 'Todos os mangás',
          checked: !this.apenasNaoCompletos,
          handler: () => {
            this.apenasNaoCompletos = false;
            alert.dismiss();
          }
        },
        {
          type: 'radio',
          label: 'Apenas os não completos',
          checked: this.apenasNaoCompletos,
          handler: () => {
            this.apenasNaoCompletos = true;
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }
  
  //Traz o resultado de acordo com o texto digitado no filtro
  filtrar(){
    this.lista_mangas_filtrado = this.lista_mangas.filter((x) => {return x.titulo.toUpperCase().includes(this.query.toUpperCase())});
  }

  //Exibe a barra de pesquisa de mangá
  mostrarBusca(){
    this.isSearching = true;
    this.query = "";
    this.search.setElementStyle("display", "block");
    this.search.setFocus();
  }

  esconderBusca(){
    this.search.setElementStyle("display", "none");
    this.isSearching = false;
    this.query = "";
    this.lista_mangas_filtrado = this.lista_mangas;
  }

  prepareAds(){
    const admobid = {
      interstitial: 'ca-app-pub-8275051926630772/7364383928',
    }

    admob.interstitial.config({
      id: admobid.interstitial,
      isTesting: true,
      autoShow: false,
    })

    admob.interstitial.prepare();
  }
}
