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

  salvarMangaEmLote(idUsuario, mangaLista){
    let url = this.apiUrl+'/manga/salvarEmLote';
    var jsonDados = {usuario: idUsuario, dados: mangaLista};
    let postData = JSON.stringify(jsonDados);
    console.log(JSON.stringify(jsonDados));
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

  ativarSincronizacao(email, senha, listaMangas){
    let url = this.apiUrl+'/manga/cadastrarUsuario';
    let postData = {
      "email": email,
      "senha": senha,
    }
    this.http.post(url, postData).subscribe((result: any) => {
      console.log(result['idUsuario']);
      
      this.localStorage.set("usuario", result); 
      this.salvarMangaEmLote(result['idUsuario'], listaMangas);
    }, error => {
      console.log(error);
    });
  }
}
