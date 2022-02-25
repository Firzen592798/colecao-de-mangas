import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MalapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MalapiProvider {

  apiUrl: String = "https://api.jikan.moe/v4";  
  constructor(public http: HttpClient) {

  }

  formatarAutor(autorArr: any){
    console.log(autorArr);
    var autor = "";
    if(autorArr != null){
      if(autorArr.authors){
        return autorArr.authors.reduce(function(result, item){  
          return result == "" ? item.name.split(",").reverse().join(" ") : result+";"+item.name.split(",").reverse().join(" ")   //authors.name  
        }, "");
      }
    }
    return autor;
  }

  getMangas(query: String) {
    var that = this;
    return new Promise((resolve, reject) => {
      
        let url = this.apiUrl+'/manga?limit=5&q='+query;
        if(navigator.onLine){
          this.http.get(url).subscribe((result: any) => {
              resolve(result.data.map(function(item){
                return {
                  malId: item.mal_id,
                  titulo: item.title,
                  autor: that.formatarAutor(item),
                  imagem: item.images.jpg.image_url
                }
              }));
            },
            (error) => {
              reject(error);
            });
          }else{
            console.log("erro");
            throw new Error("Não foi possível obter informações sobre esse mangá. Verifique sua conexão com a internet");
          }
      });
  }
}
