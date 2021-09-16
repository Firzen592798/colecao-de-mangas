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
  public usuario: any;

  constructor(public localStorage: Storage, public http: HttpClient, public mangaapi: MangaapiProvider) {
    this.atualizarVersaoDados();
    this.localStorage.get("usuario").then((output) => {
      this.usuario  = output;
    });
  }

  public salvarUsuario(usuario: any){
    this.localStorage.set("usuario", usuario); 
    this.usuario = usuario;
  }
  
  public removerUsuario(){
    this.localStorage.remove("usuario"); 
    this.usuario = null;
  }
  
  public salvarManga(key: string, manga: any){
    var novo = manga.key ? false : true;
    manga.key = key;
    manga.dataModificacao = new Date();
    manga.uLido = manga.uLido ? parseInt(manga.uLido) : 0;
    manga.uComprado = manga.uComprado ? parseInt(manga.uComprado) : 0;
    manga.lista = []
    if(manga.uComprado){
      manga.uComprado = parseInt(manga.uComprado);
      for(let i = 1; i <= manga.uComprado; i++){
        let volume = {st: "c"};
        if(i <= manga.uLido){
          volume.st = "l";
        } 
        manga.lista.push(volume); 
      }
      if(manga.uLido > manga.uComprado){
        manga.uLido = manga.uComprado;
      }
    }
    this.localStorage.set(key, manga); 
    if(this.usuario){
      if(novo){
        this.mangaapi.salvarManga(key, this.usuario.idUsuario, manga);
      }else{
        this.mangaapi.atualizarManga(key, this.usuario.idUsuario, manga).subscribe(data => {
          console.log(data);
        }, errorData => {
          console.log(errorData);
        });
      }
    }
  }

  public atualizarManga(key: string, manga: any) {
    console.log("Atualizando");
    console.log(this.usuario);
    manga.dataModificacao = new Date();
    this.localStorage.set(key, manga); 
    if(this.usuario){
      this.mangaapi.atualizarManga(key, this.usuario.idUsuario, manga).subscribe(data => {
        console.log(data);
      }, errorData => {
        console.log(errorData);
      });
    }
  }

  public atualizarMangaAndUltimoLidoAndUltimoComprado(key: string, manga: any) {
    console.log("Atualizando");
    console.log(this.usuario);
    manga.dataModificacao = new Date();
    this.localStorage.set(key, manga); 
    if(this.usuario){
      this.mangaapi.atualizarManga(key, this.usuario.idUsuario, manga);
    }
  }
 
  public listar() {
    let lista = [];
    return this.localStorage.forEach((value: any, key: string, iterationNumber: Number) => {  
      if(key != "usuario" && key != "versao"){
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
    this.mangaapi.removerManga(chave, this.usuario.idUsuario);
  }

  public atualizarVersaoDados(){
    this.localStorage.get("versao").then((versao) => {
      if(!versao){
        versao = 1;
      }
      if(versao == 1){
        this.localStorage.set("versao", 2);
        this.localStorage.forEach((value: any, key: string, iterationNumber: Number) => {  
          if(key != "usuario" && key != "versao"){
            var manga = value;  
            var novaLista = [];
            for(let volumeIt of manga.lista){
              var status;
              switch(volumeIt.st){
                case 'c': 
                  status = 'c';
                  break;
                case 'l':
                  status = 'l';
                  break;
                case 'nc':
                  status = 'nc';
              }
              let volume = {st: status};
              novaLista.push(volume);
            }
            manga.lista = novaLista;
            manga.uComprado = manga.ultimoComprado;
            manga.uLido = manga.ultimoLido;
            manga.img = manga.imagem;
            delete manga.ultimoComprado;
            delete manga.ultimoLido;
            delete manga.img;
            this.localStorage.set(key, manga); 
            console.log(manga);
          }  
        })
      }
    });
  }

  public sincronizarMangas(dados: any){

  }
}
