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
      //console.log(output);
      this.usuario  = output;
    });
  }

  public isPrimeiroAcesso(){
    return this.localStorage.get("versao").then((versao) => {
      if(versao >= 1){
        return false;
      }
      return true;
    });
  }

  public salvarUsuario(usuario: any){
    this.localStorage.set("usuario", usuario); 
    this.usuario = usuario;
  }

    //Salva um mangá tanto apenas local
    public salvarMangaApenasLocal(key: string, manga: any){
      this.localStorage.set(key, manga); 
    }

  //Salva ou atualiza um mangá tanto localmente quanto no banco de dados online caso o usuário esteja logado
  public salvarSincronizarManga(key: string, manga: any){
    var novo = manga.key ? false : true;
    var that = this;
    if(this.usuario && navigator.onLine){//Se o usuário está logado, o app vai tentar não só salvar mas sincronizar os dados na nuvem
      if(novo){
        this.mangaapi.salvarManga(key, this.usuario.idUsuario, manga).then(function(data){
          manga.sync = true;
          that.localStorage.set(key, manga); 
        }).catch(error => {
          //console.log(error);
          manga.sync = false;
          that.localStorage.set(key, manga);
        });  
      }else{
        this.mangaapi.atualizarManga(key, this.usuario.idUsuario, manga).then(function(data){
          manga.sync = true;
          that.localStorage.set(key, manga); 
        }).catch(error => {
          //console.log(error);
          manga.sync = false;
          that.localStorage.set(key, manga); 
        });   
      }
    }else{
      manga.sync = false;
      this.localStorage.set(key, manga); 
    }
  }

  //Todos os volumes precisam se atualizar para ficar de acordo com o status do ultimo lido e ultimo comprado. 
  public removerInconsistenciasLidosComprados(manga: any){
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
  }


  //Atualiza somente os dados de mudança de status de um volume do mangá(adicionar um novo volume, mudar de comprado para lido, etc)
  //Não sincroniza online pra evitar muitas requisições
  public atualizarVolumeManga(key: string, manga: any) {
    manga.dataModificacao = new Date();
    manga.sync = false;
    this.localStorage.set(key, manga); 
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
    if(this.usuario){
      this.mangaapi.removerManga(chave, this.usuario.idUsuario);
    }
  }

  public sairDaConta(){
    this.localStorage.clear();
    this.localStorage.set("versao", 2);
    this.usuario = null;
  }

  //Atualiza o formato dos dados caso o usuário esteja entrando com a nova versão do aplicativo pela primeria vez
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
              switch(volumeIt.status){
                case 'comprado': 
                  status = 'c';
                  break;
                case 'lido':
                  status = 'l';
                  break;
                case 'naocomprado':
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
            //console.log(manga);
          }  
        })
      }
    });
 }

  //Ao abrir o aplicativo, pega todos os mangás que estão com sync = false e tentam sincronizar com o banco de dados exterior
  public sincronizarMangas(listaMangas: any){
    if(navigator.onLine){
      let listaMangasSync =  listaMangas.filter(x => x.sync == false)
      var that = this;
      if(this.usuario && listaMangasSync.length > 0){
        this.mangaapi.sincronizarMangasNaEntrada(this.usuario.idUsuario, listaMangasSync).then(function(result){
          if(result["linhasAfetadas"] > 0){
            for(let manga of listaMangasSync){
              manga.sync = true;
              that.localStorage.set(manga.key, manga); 
            }
          }
        }).catch(error => {
          //console.log(error);
          return error;
        });  
      }
    }
  }
}
