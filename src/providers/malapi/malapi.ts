import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MalapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MalapiProvider {

  apiUrl: String = "https://api.jikan.moe/v3";  
  constructor(public http: HttpClient) {

  }

  getMangas(query: String) {
    return new Promise((resolve, reject) => {
        let url = this.apiUrl+'/search/manga?limit=5&q='+query;
        console.log(url);
        this.http.get(url)
          .subscribe((result: any) => {
            //resolve(result);
            resolve(result.results.map(function(item){
              return {
                titulo: item.title,
                imagem: item.image_url
              }
            }));
            //resolve(result.results);
          },
          (error) => {
            console.log(error);
            reject(error);
          });
      });
  }

}
