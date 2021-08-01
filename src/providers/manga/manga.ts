import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { MangaapiProvider } from '../mangaapi/mangaapi';
/*
  Generated class for the MangaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MangaProvider {
  private usuario: any;

  constructor(public localStorage: Storage, public http: HttpClient, public mangaapi: MangaapiProvider) {
    this.localStorage.get("usuario").then((output) => {
      this.usuario  = output;
    });
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
    if(this.usuario){
      this.mangaapi.salvarManga(key, this.usuario.idUsuario, manga);
    }
  }

  public atualizarManga(key: string, manga: any) {
    manga.dataModificacao = new Date();
    this.localStorage.set(key, manga); 
    if(this.usuario){
      this.mangaapi.atualizarManga(key, this.usuario.id, manga);
    }
  }

  public atualizarMangaAndUltimoLidoAndUltimoComprado(key: string, manga: any) {
    manga.dataModificacao = new Date();
    this.localStorage.set(key, manga); 
    if(this.usuario){
      this.mangaapi.atualizarManga(key, this.usuario.id, manga);
    }
  }
 
  public listar() {
    let lista = [];
    return this.localStorage.forEach((value: any, key: string, iterationNumber: Number) => {  
      if(key != "usuario"){
        let manga;
        manga = value;
        manga.key = key;
        lista.push(manga);
      }  
    })
    .then(() => {

      lista.sort((n1, n2) => 
        n1.titulo < n2.titulo ? -1 : 1
      );
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
