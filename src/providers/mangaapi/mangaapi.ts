import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty' 
import { AppConstants } from '../../app/app.constants';
/*
  Classe que sincroniza os dados salvos com a API externa
*/
@Injectable()
export class MangaapiProvider {
  apiUrl: String = this.appConstants.apiUrl;  
  constructor(public http: HttpClient, public localStorage: Storage, public appConstants: AppConstants) {
  
  }

  listarMangasPorUsuario(idUsuario){
    if(navigator.onLine){
      let url = this.apiUrl+'/manga/list?usuario='+idUsuario;
      console.log(url);
      return this.http.get(url);
    }
  }
  
  //Quando a aplicação é aberta, verifica se algum mangá falta ser sincronizado com a nuvem para manter a base de dados atualziada
  sincronizarMangasNaEntrada(idUsuario, mangaLista){
    //let mangaListaSalvar = Object.assign({}, mangaLista);
    let mangaListaSalvar = JSON.parse(JSON.stringify(mangaLista))
    if(navigator.onLine){
      for(let manga of mangaListaSalvar){
        manga = this.removerImagemSeMuitoGrande(manga);
        delete manga.dataModificacao;
        delete manga.sync;
      }
      console.log(mangaListaSalvar);
      let url = this.apiUrl+'/manga/sincronizarNaEntrada';
      var jsonDados = {usuario: idUsuario, dados: mangaListaSalvar};
      let postData = JSON.stringify(jsonDados);
      //console.log(url);
      //console.log(postData);
      return fetch(url, {
        method: 'post',
        body: postData
      }).then((response) => {
        if(response.ok){
          //console.log(response.text);
          //return response.text();
          return response.json();
        }else{
          return response.json().then(data => {
          throw new Error(data.mensagem);
          }
        );
      }
      });
    }else{
      //console.log("Sem internet");
    } 
  }

  //Método usado quando a sincronização é ativada e os mangás salvos localmente são sincronizados pela primeira vez
  salvarMangaEmLote(idUsuario, mangaLista){
    if(navigator.onLine){
      for(let manga of mangaLista){
        manga = this.removerImagemSeMuitoGrande(manga);
        delete manga.dataModificacao;
      }
      //console.log("Salvando em lote");
      let url = this.apiUrl+'/manga/salvarEmLote';
      var jsonDados = {usuario: idUsuario, dados: mangaLista};
      //console.log(jsonDados);
      let postData = JSON.stringify(jsonDados);
      //console.log(JSON.stringify(postData));

      return fetch(url, {
        method: 'post',
        body: postData
      }).then((response) => {
        if(response.ok){
          return response.json();
        }
      });
    }
  }

  salvarManga(key, idUsuario, manga){
    if(navigator.onLine){
      let mangaSalvar = Object.assign({}, manga);
      this.removerImagemSeMuitoGrande(mangaSalvar);
      delete mangaSalvar.dataModificacao;
      delete mangaSalvar.sync;
      let url = this.apiUrl+'/manga/post';
      let postData = {
        "novo": true,
        "id_usuario": idUsuario,
        "chave": key,
        "valor": JSON.stringify(mangaSalvar)
      }
      //console.log("Salvar manga");
      //console.log(JSON.stringify(postData));
      return fetch(url, {
        method: 'post',
        body: JSON.stringify(postData)
      }).then((response) => {
        if(response.ok){
          return response.json();
        }
      });
    }
  }

  atualizarManga(key, idUsuario, manga){
    if(navigator.onLine){
      let mangaSalvar = Object.assign({}, manga);
      console.log(mangaSalvar);
      this.removerImagemSeMuitoGrande(mangaSalvar);
      delete mangaSalvar.dataModificacao;
      delete mangaSalvar.sync;
      let url = this.apiUrl+'/manga/post';
      let postData = {
        "novo": false,
        "id_usuario": idUsuario,
        "chave": key,
        "valor": JSON.stringify(mangaSalvar)
      }
      //console.log("Att manga");
      //console.log(JSON.stringify(mangaSalvar));
      return fetch(url, {
        method: 'post',
        body: JSON.stringify(postData)
      }).then((response) => {
        if(response.ok){
          return response.json();
        }
      });
    }
  }
  
  removerManga(chave, idUsuario){
    if(navigator.onLine){
      let url = this.apiUrl+'/manga/remover';
      let postData = {
        "chave": chave,
        "id_usuario": idUsuario,
      }
      //return this.http.post(url, postData);

      return fetch(url, {
        method: 'post',
        body: JSON.stringify(postData)
      }).then((response) => {
        if(response.ok){
          return response.json();
        }
      });
    }
  }

  //Se a imagem tiver o arquivo no formato blob(no caso uma foto tirada pela camera), remove a foto pra não sobrecarregar
  private removerImagemSeMuitoGrande(manga){
    console.log(manga.imagem);
    if(manga.imagem && manga.imagem.length > 150){
      console.log("removeu imagem");
      manga.imagem = '';
    }
    return manga;
  }

  //Cadastra o usuário no banco de dados externo e ativa a sincronização
  public ativarSincronizacao(email, senha){
    if(navigator.onLine){
      let url = this.apiUrl+'/manga/cadastrarUsuario';
      let postData = {
        "email": email,
        "senha": senha,
      }
      //this.salvarMangaEmLote(13, listaMangas);

      return fetch(url, {
        method: 'post',
        body: JSON.stringify(postData)
      }).then((response) => {
        if(response.ok){
          return response.json();
        }else{
          return response.json().then(data => {
           throw new Error(data.mensagem);
          }
         );
       }
      });
    }else{
      return new Promise(function(){
        throw new Error("É necessário estar conectado com a internet");
      });
    }
  }

  //Método de login, somente usado quando o usuário está cadastrado
  login(email, senha){
    if(navigator.onLine){
      let url = this.apiUrl+'/manga/login';
      //console.log(url);
      let postData = {
        "email": email,
        "senha": senha,
      }
      //console.log(url);
      //console.log(JSON.stringify(postData));
      return fetch(url, {
        method: 'post',
        body: JSON.stringify(postData)
      }).then((response) => {
        if(response.ok){
          return response.json();
        }else{
           return response.json().then(data => {
            throw new Error(data.mensagem);
           }
          );
        }
      });
    }else{
      return new Promise(function(resolve, reject){
        throw new Error("É necessário estar conectado com a internet");
      });
    }
  }
}
