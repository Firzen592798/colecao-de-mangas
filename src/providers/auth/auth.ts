import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private user: firebase.User;
  constructor(private afAuth: AngularFireAuth, private fbDb: AngularFireDatabase) {
    afAuth.authState.subscribe(user => {
			this.user = user;
		});
  }

  criarUsuario(email, senha){
    try{
      const result = this.afAuth.auth.createUserWithEmailAndPassword(email, senha);
      console.log(result);
    }catch(e){
      console.error(e);
    }
  }

  get authenticated(): boolean {
		return this.user !== null;
	}

  logar(email, senha){
    try{
      const result = this.afAuth.auth.signInWithEmailAndPassword(email, senha);
      console.log(result);
    }catch(e){
      console.error(e);
    }
  }

  listar(){
    try{
      var items = this.fbDb.list('/usuario');
    }catch(e){
      console.log(e);
    }
    console.log(items);
    
  }

}
