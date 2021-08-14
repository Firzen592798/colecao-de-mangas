import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MangaapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MangaapiProvider {
  apiUrl: String = "http://localhost/index.php";  
  constructor(public http: HttpClient, public localStorage: Storage) {
    
  }

  listarMangasPorUsuario(idUsuario){
    console.log("Salvando em lote");
    let url = this.apiUrl+'/manga/list?usuario='+idUsuario;
    return this.http.get(url);
  }

  salvarMangaEmLote(idUsuario, mangaLista){
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
    let url = this.apiUrl+'/manga/post';
    let postData = {
      "novo": true,
      "id_usuario": idUsuario,
      "chave": key,
      "valor": JSON.stringify(manga)
    }
    this.http.post(url, postData).subscribe((result: any) => {
      console.log(result['_body']);
    }, error => {
      console.log(error);
    });
  }

  atualizarManga(key, idUsuario, manga){
    let url = this.apiUrl+'/manga/post';
    let postData = {
      "novo": true,
      "id_usuario": idUsuario,
      "chave": key,
      "valor": JSON.stringify(manga)
    }
    this.http.post(url, postData).subscribe((result: any) => {
      console.log(result['_body']);
    }, error => {
      console.log(error);
    });
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
    //this.salvarMangaEmLote(13, listaMangas);
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
