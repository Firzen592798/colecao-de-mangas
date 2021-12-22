import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty' 
import { AppConstants } from '../../app/app.constants';
/*
  Classe que sincroniza os dados salvos com a API externa
*/
@Injectable()
export class MangaapiProvider {
  apiUrl: String = this.appConstants.apiUrl;  
  constructor(public http: HttpClient, public localStorage: Storage, public network: Network, public appConstants: AppConstants) {
    
  }

  listarMangasPorUsuario(idUsuario){
      let url = this.apiUrl+'/manga/list?usuario='+idUsuario;
      console.log(url);
      return this.http.get(url);
  }
  
  //Quando a aplicação é aberta, verifica se algum mangá falta ser sincronizado com a nuvem para manter a base de dados atualziada
  sincronizarMangasNaEntrada(idUsuario, mangaLista){
    for(let manga of mangaLista){
      manga = this.removerImagemSeMuitoGrande(manga);
      delete manga.dataModificacao;
      delete manga.sync;
    }
    let url = this.apiUrl+'/manga/sincronizarNaEntrada';
    var jsonDados = {usuario: idUsuario, dados: mangaLista};
    let postData = JSON.stringify(jsonDados);
    console.log(url);
    console.log("Post data");
    console.log(postData);
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
  }

  //Método usado quando a sincronização é ativada e os mangás salvos localmente são sincronizados pela primeira vez
  salvarMangaEmLote(idUsuario, mangaLista){
    for(let manga of mangaLista){
      manga = this.removerImagemSeMuitoGrande(manga);
      delete manga.dataModificacao;
    }
    console.log("Salvando em lote");
    let url = this.apiUrl+'/manga/salvarEmLote';
    var jsonDados = {usuario: idUsuario, dados: mangaLista};
    console.log(jsonDados);
    let postData = JSON.stringify(jsonDados);
    console.log(postData);

    return fetch(url, {
      method: 'post',
      body: postData
    }).then((response) => {
      if(response.ok){
        return response.json();
      }
    });
    /*(this.http.post(url, postData).subscribe((result: any) => {
      console.log(result['_body']);
    }, error => {
      console.log(error);
    });*/
  }

  salvarManga(key, idUsuario, manga){
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
    console.log("Enviando data");
    console.log(postData);
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

  atualizarManga(key, idUsuario, manga){
    let mangaSalvar = Object.assign({}, manga);
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
    console.log("Enviando data");
    console.log(JSON.stringify(postData));
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
  
  removerManga(chave, idUsuario){
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

  //Se a imagem tiver o arquivo no formato blob(no caso uma foto tirada pela camera), remove a foto pra não sobrecarregar
  private removerImagemSeMuitoGrande(manga){
    if(manga.imagem && manga.imagem.length > 150){
      console.log("removeu imagem");
      manga.imagem = '';
    }
    return manga;
  }

  //Cadastra o usuário no banco de dados externo e ativa a sincronização
  public ativarSincronizacao(email, senha){
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
        }
      });
  }

  //Método de login, somente usado quando o usuário está cadastrado
  login(email, senha){
      let url = this.apiUrl+'/manga/login';
      console.log(url);
      let postData = {
        "email": email,
        "senha": senha,
      }
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
  }

  //Método de logoff, usado pra sair da conta que está logada
  /*desativarSincronizacao(email){
    let url = this.apiUrl+'/manga/apagarDadosUsuario';
    let postData = {
      "email": email,
    }
    console.log(postData);
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(postData)
    });
  }*/
}
