import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty' 
/*
  Generated class for the MangaapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MangaapiProvider {
  apiUrl: String = "http://localhost/index.php";  
  constructor(public http: HttpClient, public localStorage: Storage, public network: Network) {
    
  }

  listarMangasPorUsuario(idUsuario){
      let url = this.apiUrl+'/manga/list?usuario='+idUsuario;
      console.log(url);
      return this.http.get(url);
  }

  salvarMangaEmLote(idUsuario, mangaLista){
    for(let manga of mangaLista){
      manga = this.removerImagemSeMuitoGrande(manga);
      delete manga.dataModificacao;
    }
    console.log("Salvando em lote");
    let url = this.apiUrl+'/manga/salvarEmLote';
    var jsonDados = {usuario: idUsuario, dados: mangaLista};
    console.log(jsonDados);
    let postData = JSON.stringify(jsonDados);
    console.log(postData);
    this.http.post(url, postData).subscribe((result: any) => {
      console.log(result['_body']);
    }, error => {
      console.log(error);
    });
  }

  salvarManga(key, idUsuario, manga){
    let mangaSalvar = Object.assign({}, manga);
    this.removerImagemSeMuitoGrande(mangaSalvar);
    delete mangaSalvar.dataModificacao;
    let url = this.apiUrl+'/manga/post';
    let postData = {
      "novo": true,
      "id_usuario": idUsuario,
      "chave": key,
      "valor": JSON.stringify(mangaSalvar)
    }
    console.log("Enviando data");
    console.log(postData);
    return this.http.post(url, postData);
  }

  atualizarManga(key, idUsuario, manga){
    let mangaSalvar = Object.assign({}, manga);
    this.removerImagemSeMuitoGrande(mangaSalvar);
    delete mangaSalvar.dataModificacao;
    let url = this.apiUrl+'/manga/post';
    let postData = {
      "novo": false,
      "id_usuario": idUsuario,
      "chave": key,
      "valor": JSON.stringify(mangaSalvar)
    }
    console.log("Enviando data");
    console.log(JSON.stringify(postData));
    return this.http.post(url, postData);
  }
  
  removerManga(chave, idUsuario){
    let url = this.apiUrl+'/manga/remover';
    let postData = {
      "chave": chave,
      "id_usuario": idUsuario,
    }
    console.log(url);
    console.log(JSON.stringify(postData));
    return this.http.post(url, postData)
  }

  private removerImagemSeMuitoGrande(manga){
    if(manga.imagem && manga.imagem.length > 150){
      console.log("removeu imagem");
      manga.imagem = '';
    }
    return manga;
  }

  public ativarSincronizacao(email, senha, listaMangas){
      let url = this.apiUrl+'/manga/cadastrarUsuario';
      let postData = {
        "email": email,
        "senha": senha,
      }
      //this.salvarMangaEmLote(13, listaMangas);
      return this.http.post(url, postData);
  }

  login(email, senha){
      let url = this.apiUrl+'/manga/login';
      let postData = {
        "email": email,
        "senha": senha,
      }
      console.log(url);
      console.log(postData);
      return this.http.post(url, postData);
  }

  desativarSincronizacao(email){
    let url = this.apiUrl+'/manga/apagarDadosUsuario';
    let postData = {
      "email": email,
    }
    console.log(postData);
    return this.http.post(url, postData);
  }
}
