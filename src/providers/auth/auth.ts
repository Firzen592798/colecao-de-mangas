import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private firebaseAuthentication: FirebaseAuthentication) {

  }

  criarUsuario(email, senha){
    this.firebaseAuthentication.createUserWithEmailAndPassword(email, senha);
  }

  logar(email, senha){
    this.firebaseAuthentication.signInWithEmailAndPassword(email, senha)
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
  }

}
