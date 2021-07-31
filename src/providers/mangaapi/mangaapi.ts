import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MangaapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MangaapiProvider {
  apiUrl: String = "http://localhost/index.php";  
  constructor(public http: HttpClient) {
    
  }

  salvarManga(key, manga){
    let url = this.apiUrl+'/manga/post';
    let postData = {
      "novo": true,
      "id_usuario": 1,
      "chave": key,
      "valor": JSON.stringify(manga)
    }
    this.http.post(url, postData).subscribe((result: any) => {
      console.log(result['_body']);
    }, error => {
      console.log(error);
    });
  }

  atualizarManga(key, manga){
    let url = this.apiUrl+'/manga/post';
    let postData = {
      "novo": true,
      "id_usuario": 1,
      "chave": key,
      "valor": JSON.stringify(manga)
    }
    this.http.post(url, postData).subscribe((result: any) => {
      console.log(result['_body']);
    }, error => {
      console.log(error);
    });
  }
}
