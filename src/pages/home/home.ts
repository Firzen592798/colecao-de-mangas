
import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, Checkbox } from 'ionic-angular';
import { AdicionarMangaPage } from '../adicionar-manga/adicionar-manga';
import { MangaProvider } from '../../providers/manga/manga';
import { CapitulosMangaPage } from '../capitulos-manga/capitulos-manga';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public lista_mangas: any;
  public apenasNaoCompletos: boolean = false;
  constructor(public navCtrl: NavController, public mangaProvider: MangaProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {

  }

  ionViewDidEnter(){
    this.mangaProvider.listar().then(data => {
      this.lista_mangas = data;
    });
  }

  irParaAdicionarManga(){
    this.navCtrl.push(AdicionarMangaPage)
  }

  irParaCapitulos(manga){
    this.navCtrl.push(CapitulosMangaPage, {manga: manga});
  }

  editarManga(manga) {
    let alert = this.alertCtrl.create({
      title: 'Editar mangá',
      inputs: [
        {
          name: 'titulo',
          placeholder: 'Titulo',
          value: manga.titulo
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            manga.titulo = data.titulo;
            this.mangaProvider.atualizarManga(manga.key, manga);
            this.presentToast("Mangá editado com sucesso");
          }
        }
      ]
    });
    alert.present();
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
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.mangaProvider.excluirManga(manga.key);
            this.mangaProvider.listar().then(data => {
              this.lista_mangas = data;
            });
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
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  toggleFiltro(){
    this.apenasNaoCompletos = !this.apenasNaoCompletos;
  }

  toggleCompleto(manga){
    manga.completo = !manga.completo;
    this.mangaProvider.atualizarManga(manga.key, manga);
    if(manga.completo)
      this.presentToast("Mangá marcado como completo");
    else
      this.presentToast("Mangá marcado como não completo");
  }
  
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
}
