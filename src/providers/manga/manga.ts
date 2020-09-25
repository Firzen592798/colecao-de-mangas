import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the MangaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MangaProvider {

  constructor(public localStorage: Storage) {

  }

  public salvarManga(key: string, manga: any){
    manga.key = key;
    manga.dataModificacao = new Date();
    manga.ultimoLido = manga.ultimoLido ? parseInt(manga.ultimoLido) : 0;
    manga.ultimoComprado = manga.ultimoComprado ? parseInt(manga.ultimoComprado) : 0;
    manga.lista = []
    if(manga.ultimoComprado){
      manga.ultimoComprado = parseInt(manga.ultimoComprado);
      for(let i = 1; i <= manga.ultimoComprado; i++){
        let volume = {numero: i, status: "comprado"};
        if(i <= manga.ultimoLido){
          volume.status = "lido";
        } 
        manga.lista.push(volume); 
      }
      if(manga.ultimoLido > manga.ultimoComprado){
        manga.ultimoLido = manga.ultimoComprado;
      }
    }
    this.localStorage.set(key, manga); 
  }

  public atualizarManga(key: string, manga: any) {
    manga.dataModificacao = new Date();
    this.localStorage.set(key, manga); 
  }

  public atualizarMangaAndUltimoLidoAndUltimoComprado(key: string, manga: any) {
    manga.dataModificacao = new Date();
    this.localStorage.set(key, manga); 
  }
 
  public listar() {
    let lista = [];
    console.log("Listar");
    return this.localStorage.forEach((value: any, key: string, iterationNumber: Number) => {
      console.log(value);
      let manga;
      manga = value;
      manga.key = key;
      console.log(JSON.stringify(manga));
      lista.push(manga);
    })
      .then(() => {
        console.log(JSON.stringify(lista));
        lista.sort((n1, n2) => 
         n1.titulo < n2.titulo ? -1 : 1
        );
        console.log(JSON.stringify(lista));
        return Promise.resolve(lista);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  
  public excluirManga(chave){
    this.localStorage.remove(chave);
  }
}
